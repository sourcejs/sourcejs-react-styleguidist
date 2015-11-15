var path = require('path');
var fs = require('fs');
var minimist = require('minimist');
var prettyjson = require('prettyjson');
var utils = require('./server');
var _ = require('lodash');

var sourceJSUtils;
var globalConfig;
var pathToSourceJSUser = '';

if (global.pathToApp) {
	sourceJSUtils = require(path.join(global.pathToApp, 'core/lib/utils'));
	globalConfig = global.opts.plugins && global.opts.plugins.reactStyleguidist ? global.opts.plugins.reactStyleguidist : {};

	pathToSourceJSUser = global.userPath;
}

var config = {
	enabled: true,
	bundlePath: 'build/bundle.js',

	// Public object is exposed to Front-end via options API.
	public: {},

	// Original styleguidist options
	rootDir: path.join(pathToSourceJSUser, 'specs'),
	components: './**/*.js',
	styleguideDir: path.join(pathToSourceJSUser, 'build/styleguide'),

	highlightTheme: 'base16-light',
	verbose: false,
	getExampleFilename: function(componentpath) {
		return path.join(path.dirname(componentpath), 'readme.md');
	},
	updateWebpackConfig: null

	// Not used in SourceJS integration
	// title: 'Style guide',
	// template: path.join(__dirname, '../templates/index.html'),
	// serverHost: 'localhost',
	// serverPort: 3000,
};

if (sourceJSUtils) {
	sourceJSUtils.extendOptions(config, globalConfig);
}

function readConfig() {
	var argv = minimist(process.argv.slice(2));
	var configFilepath = findConfig(argv);
	var customConfig = {};
	var options = config;

	if (configFilepath) {
		customConfig = require(configFilepath);
	}

	options = _.merge({}, options, customConfig);

	if (customConfig) {
		options.rootDir = path.resolve(path.dirname(configFilepath), options.rootDir);
	}

	validateConfig(options);

	if (options.verbose) {
		console.log();
		console.log(prettyjson.render(options));
		console.log();
	}

	if (options.rootDir === global.userPath) {
		throw Error('Styleguidist: "rootDir" should not point to folder with node_modules');
	}
	if (!utils.isDirectoryExists(options.rootDir)) {
		throw Error('Styleguidist: "rootDir" directory not found: ' + options.rootDir);
	}

	return options;
}

function findConfig(argv) {
	if (argv.config) {
		// Custom config location

		var configFilepath = path.join(process.cwd(), argv.config);
		if (!fs.existsSync(configFilepath)) {
			throw Error('Styleguidist config not found: ' + configFilepath + '.');
		}

		return configFilepath;
	}
}

function validateConfig(options) {
	if (!options.rootDir) {
		throw Error('Styleguidist: "rootDir" options is required.');
	}
	if (!options.components) {
		throw Error('Styleguidist: "components" options is required.');
	}
	if (options.getExampleFilename && typeof options.getExampleFilename !== 'function') {
		throw Error('Styleguidist: "getExampleFilename" options must be a function.');
	}
	if (options.updateWebpackConfig && typeof options.updateWebpackConfig !== 'function') {
		throw Error('Styleguidist: "updateWebpackConfig" options must be a function.');
	}
}

module.exports = readConfig();
