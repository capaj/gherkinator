var analyzer = require('../gherkinator').analyzer;
var should = require('should');

describe('analyzer outputs with test feature files', function() {
	it('should return an array of size 6 for one basic file', function() {
		var steps = analyzer.file('./test/test_features/basic.feature');
		var keys = Object.keys(steps);
		keys.length.should.equal(6);
		keys[0].should.equal('one thing');
		keys[2].should.eql('yet another thing');
		steps[keys[2]].usages.should.eql(['And yet another thing']);
		steps[keys[2]].keywords.should.eql(['And']);
		steps[keys[2]].realKeywords.should.eql(['Given']);

	});

	it('should return an array of size 12 for glob of files', function() {
		var steps = analyzer.glob('./test/test_features/*.*');
		var keys = Object.keys(steps);
		keys.length.should.equal(11);
		keys[keys.length-1].should.equal("I don't see something else in second feature");
		steps[keys[2]].usages.length.should.equal(1);
		steps[keys[2]].useCount.should.equal(2);
	});
});
