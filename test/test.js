var analyzer = require('../gherkinator').analyzer;
var should = require('should');

describe('analyzer outputs with test feature files', function() {
	it('should return an array of size 6 for one basic file', function() {
		var keys = Object.keys(analyzer.file('./test/test_features/basic.feature'));
		keys.length.should.equal(6);
		keys[0].should.equal('one thing');
	});

	it('should return an array of size 12 for glob of files', function() {
		var steps = analyzer.glob('./test/test_features/*.*');
		var keys = Object.keys(steps);
		keys.length.should.equal(11);
		keys[keys.length-1].should.equal("I don't see something else in second feature");
		steps[keys[2]].useCount.should.equal(2);
	});
});
