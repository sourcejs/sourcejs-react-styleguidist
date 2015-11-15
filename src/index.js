import React from 'react';
import ReactDOM from 'react-dom';
import { setComponentsNames, globalizeComponents } from './utils/utils';
import Playground from 'components/Playground';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { config, components } = require('styleguide!');

function getSpecName() {
	var specName = window.location.pathname;

	specName = specName.split('/');
	specName.splice(specName.length - 1, 1);
	specName = specName.join('/').replace(/^\//, '');

	return specName.toLowerCase();
}

components = setComponentsNames(components);
globalizeComponents(components);

var hooks = Array.prototype.slice.call(document.querySelectorAll('.source_styleguidist_example'));
var component = components[getSpecName()];

if (component.examples) {
	hooks.forEach((hook) => {
		var exampleIndex = hook.getAttribute('data-jsx-example');
		var example = component.examples[exampleIndex];

		ReactDOM.render(
			<Playground code={example.content} evalInContext={example.evalInContext} highlightTheme={config.highlightTheme} key={exampleIndex} index={exampleIndex} />,
			hook
		);
	});
}
else {
	console.log('Styleguidist didn\'t fount any code examples for this spec.');
}
