var assign = require('object-assign');
var jison = require('jison');
var loaderUtils = require('loader-utils');

module.exports = function (input) {
    var globalOptions = this.options.jison || {};
    var loaderOptions = loaderUtils.parseQuery(this.query);
    var options = assign(globalOptions, loaderOptions)
    var parser = new jison.Generator(input);
    if (options.moduleType) {
        return parser.generate(options);
    } else {
        options.moduleType = 'js';
        var moduleName = options.moduleName || 'parser';
        return [
            'exports.parser = ' + moduleName + ';',
            'exports.Parser = ' + moduleName + '.Parser;',
            'exports.parse = ' + moduleName + '.parse.bind(' + moduleName + ');',
            parser.generate(options)
        ].join('\n');
    }
};
