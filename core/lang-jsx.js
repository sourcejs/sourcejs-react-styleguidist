'use strict';

module.exports.processExample = function (code, index) {
	return '<div class="source_example"><div class="source_styleguidist_example" data-jsx-example="'+index+'"></div></div><div class="source_clean source_styleguidist_code source_styleguidist_code__'+index+'" data-jsx-example="'+index+'"></div>';
};
