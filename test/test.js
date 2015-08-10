
var assert = require('assert');
var bb = require('bluebird');
var steps = require('promise-steps');
describe('steps', function(done) {
	it('array', function(done) {
		var a = bb.resolve(1);
		var b = bb.resolve(2);
		var c = bb.resolve(3);
		var rtn = steps([a, b, c]);

		rtn.then(function(val) {
			assert(3, val);
			done();
		});
	});
})