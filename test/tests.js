var assert = require('assert');

var Inject = require('../inject.js');

suite('Test InjectJS', function() {

    function foo(a, b) {
        return a + b;
    }

    function bar(greeting) {
        return greeting + ' ' + this.name;
    }

    var mFoo = new Inject(foo);;
    var mBar  = new Inject(bar);;

    test('Find the name of a function', function() {
        assert.equal('foo', mFoo.name);
    });

    test('Find the list of arguments of a function', function() {
        assert.equal('a', mFoo.args[0]);
        assert.equal('b', mFoo.args[1]);
    });

    test('Function can be properly created', function() {
        var newFoo = mFoo.toFunction();
        assert.equal(5, newFoo(2, 3));
        assert.equal(1, newFoo(0, 1));
    });

    test('Function can be properly created with .export', function() {
        var newFoo = mFoo.export();
        assert.equal(5, newFoo(2, 3));
        assert.equal(1, newFoo(0, 1));
    });

    test('Function can be .call\'d', function() {
        assert.equal(5, mFoo.call({}, 2, 3));
        assert.equal('Hey Bob', mBar.call({ name: 'Bob' }, 'Hey'));
    });

    test('Function can be .apply\'d', function() {
        assert.equal(5, mFoo.apply({}, [2, 3]));
        assert.equal('Hello Jim', mBar.call({ name: 'Jim' }, ['Hello']));
    });

});
