var analyzer = require('../gherkinator').analyzer;
var should = require('should');

//gherkinator.file('../../features/apps/AV/remote/state_v3.feature');

describe('analyzer outputs with test feature files', function() {
	it('should return an array of size 5 for one basic file', function() {
		var keys = Object.keys(analyzer.file('./test/test_features/basic.feature'));
		keys.length.should.be.exactly(6);
		keys[0].should.be.exactly('one thing');
	});
});
