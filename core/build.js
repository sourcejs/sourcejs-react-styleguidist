var path = require('path');
var express = require('express');
var webpack = require('webpack');

global.userPath = global.userPath || process.cwd();
global.pathToApp = global.pathToApp || path.join(process.cwd(), 'node_modules/sourcejs');

var makeWebpackConfig = require('../src/make-webpack-config.js');
var config = require('../src/utils/config');
var env = process.env.NODE_ENV || 'development';

console.log('ReactStyleguidist: webpack building '+ env +' bundle...');

webpack(makeWebpackConfig(process.env.NODE_ENV), function (err, stats) {
	if (err) {
		console.error('ReactStyleguidist: error building webpack bundle', err, stats);
	}

	console.log('ReactStyleguidist: webpack '+ env +' build done');
});
