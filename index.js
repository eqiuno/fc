var bb = require('bluebird');
var slice = Array.prototype.slice;

module.exports = exports = function(fns) {
	if(!Array.isArray(fns) || fns.length === 0) {
		throw new Error('required function array is missed');
	}


	return new Promise(function(resolv, reject) {
		var idx = 0;	

		function onFilled(data) {
			if(idx < fns.length) {
				next(data);
				idx++;
			} else {
				resolv(data);
			}
		}

		function onReject(err) {
			reject(err);
		}

		function next(val) {
			var fn = fns[idx];
			var rtn = fn.apply(this, val);
			if(!isPromise(rtn)) {
				throw new Error('fn is not promise');
			}

			rtn.then(onFilled, onReject);
		}
	});
	
	function isPromise(rtn) {
		return 'function' === typeof rtn.then;
	}
}