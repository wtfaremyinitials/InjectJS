var HEADER_REGEX    = /function\ *\w*\([A-Za-z0-9\ ,]*\)/;

var MutableFunction = function(inputFunction) {
    this.func = inputFunction || function() {};
};

MutableFunction.prototype = {
    getAsString: function() {
        return this.func + '';
    },

    NAME_REGEX: /function\ *(\w*)/,
    getName:     function() {
        var funcStr = this.getAsString(this.func);
        var name    = funcStr.match(this.NAME_REGEX)[1];

        if(name == '')
            name = undefined;

        return name;
    },

    PARAM_REGEX: /function\ *\w*\((\s*(_?)(.+?)\1\s*)?\)/,
    getParams:   function() {
        var funcStr = this.getAsString(this.func);
        var params  = funcStr.match(this.PARAM_REGEX)[1];
        if(params == undefined)
            return [];
        params = params.split(',');
        params = params.map(function(str) { return str.trim(); });
        return params;
    }
};


var fooFunc = function() {
    console.log("Hello World");
    console.log("Derp")
    var a = 0;
    a++; a++;
    console.log(a);
};

function barFunc() {
    console.log("Hello World");
    console.log("Derp")
    var a = 0;
    a++; a++;
    console.log(a);
};

function bazFunc(foo, bar, baz, $) {
    console.log(in1 + in1);
};

var test = new MutableFunction(bazFunc);
console.log(test.getName());
console.log(test.getParams());
