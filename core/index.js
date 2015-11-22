var express = require('express');
var webpack = require('webpack');
var makeWebpackConfig = require('../src/make-webpack-config.js');
var env = global.MODE || process.env.NODE_ENV;
var config = require('../src/utils/config');

if (config.enabled) {
	var compiler = webpack(makeWebpackConfig(env));

	if (env !== 'production') {
		global.app.use(require('webpack-dev-middleware')(compiler, {
			noInfo: true
		}));
		global.app.use(require('webpack-hot-middleware')(compiler));
	} else if (config.preBuild) {
		require('./build.js');
	}
}
