var slice = Array.prototype.slice;

module.exports = exports = function (fns) {
    if (!Array.isArray(fns)) {
        fns = slice.call(arguments);
    }

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
            else if (isFunction(fn)) {
                try {
                    rtn = fn.apply(this, slice.call(arguments));
                } catch (e) {
                    return reject(e);
                }
            }

            if (!isPromise(rtn)) {
                var p = new Promise(function (resolve) {
                    resolve(rtn);
                });
                rtn   = p;
            }

            return rtn.then(onFilled, onReject);
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