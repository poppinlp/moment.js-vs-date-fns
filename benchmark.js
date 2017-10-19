const
	Benchmark = require('benchmark'),
	moment = require('moment'),
	dateFns = require('date-fns');

const suiteOptions = {
	onStart: () => {
		console.log('Start benchmark...');
	},
	onCycle: e => {
		console.log(`start cycle ${e.currentTarget.name}`);
	},
	onAbort: e => {
		console.log('on abort', e);
	},
	onError: e => {
		console.log('on error', e);
	},
	onReset: e => {
		console.log('on reset', e);
	},
	onComplete: e => {
		console.log('Fastest is ' + e.currentTarget.filter('fastest').map('name'));
	}
};

const suite = new Benchmark.Suite('format', suiteOptions);

suite
	.add('moment#format', () => {
		moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a');
	})
	.add('date-fns#format', function () {
		dateFns.format(new Date(), 'dddd, MMMM Do YYYY, h:mm:ss a');
	})
	.run({
		async: true
	});

const suite2 = new Benchmark.Suite('parse', suiteOptions);

suite2
	.add('moment#parse', () => {
		moment();
	})
	.add('date-fns#parse', () => {
		dateFns.parse(new Date());
	})
	.run({
		async: true
	});
