var slice = Array.prototype.slice;

module.exports = exports = function (fns) {
    if (!Array.isArray(fns)) {
        fns = slice.call(arguments);
    }

    var self = {};
    return new Promise(function (resolve, reject) {
        var idx = 0;

        function onFilled(data) {
            if (idx < fns.length) {
                next(data);
                idx++;
            } else {
                resolve(data);
            }
        }

        function onReject(err) {
            reject(err);
        }

        function next(val) {
            var fn = fns[idx];
            var rtn;
            if (isPromise(fn)) {
                rtn = fn;
            }
            if (isFunction(fn)) {
                try {
                    rtn = fn.apply(self, slice.call(arguments));
                } catch (e) {
                    return reject(e);
                }
            }

            if (Array.isArray(fn)) {
                rtn = Promise.all(promiseArray(fn, val));
            }

            if (!isPromise(rtn)) {
                rtn = Promise.resolve(rtn);
            }

            return rtn.then(onFilled, onReject);
        }

        function promiseArray(arr, value) {
            var rtn = [];
            arr.forEach(function (item) {
                if (isFunction(item)) {
                    var result = item.apply(self, [value]);
                    return rtn.push(result);
                }
                if (isPromise(item)) {
                    return rtn.push(item);
                }

                return rtn.push(Promise.resolve(item));
            });

            return rtn;
        }

        next();
    });


    function isPromise(rtn) {
        return rtn && 'function' === typeof rtn.then;
    }

    function isFunction(obj) {
        return typeof obj === 'function';
    }
};