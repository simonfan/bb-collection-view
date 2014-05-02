require.config({
	urlArgs: 'bust=0.004732795059680939',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'bb-collection-view': 'index',
		backbone: '../bower_components/backbone/backbone',
		jquery: '../bower_components/jquery/dist/jquery',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		qunit: '../bower_components/qunit/qunit/qunit',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		subject: '../bower_components/subject/built/subject',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		'bb-dock': '../bower_components/bb-dock/built/bb-dock',
		q: '../bower_components/q/q'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
