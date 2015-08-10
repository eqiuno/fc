var assert = require('assert');
var fc     = require('..');
describe('fc_promises', function () {
    it('array', function (done) {
        var a   = p(1);
        var b   = p(2);
        var c   = p(3);
        var rtn = fc([a, b, c]);

        rtn.then(function (val) {
            assert.equal(val, 3);
            done();
        }).catch(function (err) {
            done(err);
        });
    });
});

describe('fc_functions', function () {
    it('array', function (done) {
        var rtn = fc([f(1), f(2), f(3)]);

        rtn.then(function (val) {
            assert.equal(val, 3);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('throw', function (done) {
        var rtn = fc([f(1), function () {
            throw new Error('abc');
        }, f(3)]);
        rtn.then(function () {
            done(new Error('error is not thrown'));
        }).catch(function (err) {
            done();
        });
    })
});

describe('fc_arguments', function () {
    it('arguments', function (done) {
        var a   = p(1);
        var b   = p(2);
        var c   = p(3);
        var rtn = fc(a, b, c);
        rtn.then(function (v) {
            assert.equal(v, 3);
            done();
        }).catch(function (err) {
            done(err);
        })
    })
});

describe('fc_pass_value', function () {
    it('val_pass', function (done) {
        function a() {
            return 1;
        }

        function b(v) {
            return 2 + v;
        }

        function c(v) {
            return 3 + v;
        }

        var rtn = fc(a, b, c).then(function (v) {
            assert(v, 6);
            done();
        }).catch(function (err) {
            done(err);
        })
    });
    it('promise_pass', function (done) {
        function a() {
            return Promise.resolve(1);
        }

        function b(v) {
            return Promise.resolve(2 + v);
        }

        function c(v) {
            return Promise.resolve(3 + v);
        }

        var rtn = fc(a, b, c).then(function (v) {
            assert.equal(v, 6);
            done();
        }).catch(function (err) {
            done(err);
        })
    });
});

describe('bind this', function () {
    it('this', function (done) {
        function a() {
            this.a = 100;
        }

        function b() {
            this.b = 200;
        }

        function c() {
            return this.a + this.b;
        }

        fc(a, b, c).then(function (v) {
            assert.equal(v, 300);
            done();
        }).catch(function (err) {
            done(err);
        })
    });
})

function f(n) {
    return function () {
        return p(n);
    }
}

function p(v) {
    return Promise.resolve(v);
}
