var fs = require('fs');
var gherkin = require('gherkin');
var glob = require('glob');
require('./o-values');

var analyzerMethods = {
	/**
	 *
	 * @param {String} file
	 */
	file: function(file) {

		var Lexer = gherkin.Lexer('en');
		var steps = {};
		var lexer = new Lexer({
			comment: function(value, line) {
				//console.log(value);
			},
			tag: function(value, line) {
				//console.log(value);
			},
			feature: function(keyword, name, description, line) {
				//console.log(keyword + ': ' + name);
			},
			background: function(keyword, name, description, line) {
				//console.log('  ' + keyword + ': ' + name);
			},
			scenario: function(keyword, name, description, line) {
				//console.log('  ' + keyword + ': ' + name);
			},
			scenario_outline: function(keyword, name, description, line) {
				//console.log('  ' + keyword + ': ' + name);
			},
			examples: function(keyword, name, description, line) {
				//console.log('  ' + keyword + ': ' + name);
			},
			step: function(word, name, line) {
				var ind = name;
				var keyword = word.trim();
				if (ind.indexOf('<') !== -1) {
					ind = ind.replace(/<(.+)>/g, '');	// strip <> arguments in our step name-we don't want to include it in the index
				}
				if (!steps[ind]) {
					steps[ind] = {used: 1, keywords: [keyword], usage: name};
				} else {
					var step = steps[ind];
					if (step.keywords.indexOf(keyword) === -1) {
						step.keywords.push(keyword);
					}
					step.used += 1;
				}
			},
			doc_string: function(content_type, string, line) {
				//console.log('      """\n' + string + '\n      """');
			},
			row: function(row, line) {
				//console.log('      | ' + row.join(' | ') + ' |');
			},
			eof: function() {
				//console.log('=====');
			}
		});

		lexer.scan(fs.readFileSync(file));

		return steps;
	},
	/**
	 * @param {String} globExp
	 */
	glob: function(globExp) {
		var files = glob.sync(globExp);
		//TODO implement
	},
	/**
	 * @param {String} sentence
	 */
	sentenceSimilarity: function(sentence) {
		//TODO implement
	}
};
module.exports = analyzerMethods;

