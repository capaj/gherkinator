var fs = require('fs');
var gherkin = require('gherkin');
var glob = require('glob');
require('./o-values');
var _ = require('lodash');

var analyzerMethods = {
	/**
	 *
	 * @param {String} file path to the file you want to analyze
	 * @param {Object} [previousResults]
	 * @param {String} lng
	 * @returns {Object} with objects indexed by raw step name
	 */
	file: function(file, previousResults, lng) {
		var lang = lng || 'en';
		var realKeywords = ['Given', 'Then', 'When'];
		var lastRealKeyword;

		var Lexer = gherkin.Lexer(lang);
		var steps = previousResults || {};
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
				console.log('  ' + keyword + ': ' + name);
			},
			step: function(word, name, line) {
				var ind = name;
				var keyword = word.trim();
				if (keyword !== 'And') {
					lastRealKeyword = keyword;
				}
				if (ind.indexOf('<') !== -1) {
					ind = ind.replace(/<(.+)>/g, '');	// strip <> arguments in our step name-we don't want to include it in the index
				}
				var usage = (word + name);
				if (!steps[ind]) {
					steps[ind] = {
						useCount: 1,
						keywords: [keyword],
						usages: [usage],
						realKeywords: [lastRealKeyword],
						name: name
					};
				} else {
					var step = steps[ind];
					if (!step.keywords.contains(keyword)) {
						step.keywords.push(keyword);
					}
					if (!step.realKeywords.contains(lastRealKeyword)) {
						step.realKeywords.push(lastRealKeyword);
					}
					if (!step.usages.contains(usage)) {
						step.usages.push(usage);
					}
					step.useCount++;
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
	 * @returns {Object} with objects indexed by raw step name
	 */
	glob: function(globExp) {
		var steps = {};
		var files = glob.sync(globExp);
		files.forEach(function (file){
			analyzerMethods.file(file, steps);
		});

		return steps;
	},
	/**
	 * @param {String} sentence
	 */
	sentenceSimilarity: function(sentence) {
		//TODO implement
	}
};
module.exports = analyzerMethods;

