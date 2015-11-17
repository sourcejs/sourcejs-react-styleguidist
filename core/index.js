var express = require('express');
var webpack = require('webpack');
var makeWebpackConfig = require('../src/make-webpack-config.js');
var env = global.MODE || process.env.NODE_ENV;
var config = require('../src/utils/config');

if (config.enabled) {
	var compiler = webpack(makeWebpackConfig(env));

	if (env === 'development') {
		global.app.use(require('webpack-dev-middleware')(compiler, {
			noInfo: true
		}));
		global.app.use(require('webpack-hot-middleware')(compiler));
	} else {
		console.log('webpack building production styleguidist bundle...');

		webpack(makeWebpackConfig('production'), function(err, stats) {
			if (err) {
				console.log(err, stats);
			}

			console.log('webpack production styleguidist build done');
		});
	}
}
