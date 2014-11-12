var MutableFunction = function(func) {
    this.name = '';
    this.args = [];
    this.body = [];

    var funcStr = func+'';

    var nameMatch = funcStr.match(/^function\s*([^\(]*)\(\s*[^\)]*\)/m);
    if(nameMatch === null)
        this.name = undefined;
    else
        this.name = nameMatch[1];

    var argsMatch = funcStr.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m);
    if(argsMatch === null)
        this.args = [];
    else
        this.args = argsMatch[1].split(',').map(function(arg) { return arg.trim(); });

    var bodyMatch = funcStr.match(/^function\s*[^\(]*\(\s*[^\)]*\)\s*\{([\S\s]*)\}/);
    this.body = bodyMatch[1].split(/[;\n]/);
    this.body = clean(this.body, '');
    this.body = this.body.map(function(line) { return line.trim(); });
};

MutableFunction.prototype.toFunction = function() {
    var func  = new Function(this.args.join(','), this.body.join('\n'));
    func.name = this.name;
    return func;
};
MutableFunction.prototype.export = MutableFunction.prototype.toFunction;

MutableFunction.prototype.apply = function(that, args) {
    return this.toFunction().apply(that, args);
};

MutableFunction.prototype.call = function(that) {
    return this.apply(that, Array.prototype.slice.call(arguments, 1));
};

module.exports = MutableFunction;

var clean = function(arr, toDelete) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == toDelete) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
};
