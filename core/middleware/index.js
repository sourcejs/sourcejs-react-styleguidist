var path = require('path');
var specUtils = require(path.join(global.pathToApp,'core/lib/specUtils'));
var config = require('../../src/utils/config.js');

/*
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
var processRequest = function (req, res, next) {
    if (!config.enabled) {
        next();
        return;
    }

    // Check if request is targeting Spec
    if (req.specData && req.specData.renderedHtml && req.specData.info.role !== 'navigation') {
		var append;

		if (process.env.NODE_ENV === 'development') {
			append = '<script src="/'+ config.bundlePath +'"></script>'
		} else {
			append = '<link rel="stylesheet" href="/build/styleguide/build/styles.css"><script src="/build/styleguide/' + config.bundlePath + '"></script>'
		}

		req.specData.renderedHtml += append;
		next();
    } else {
        next();
    }
};

exports.process = processRequest;
