# React Styleguidist Integration Plugin for SourceJS

[![Build Status](https://travis-ci.org/sourcejs/sourcejs-react-styleguidist.svg?branch=master)](https://travis-ci.org/sourcejs/sourcejs-react-styleguidist)

Fork of React Style Guide generator [react-styleguidist](https://github.com/sapegin/react-styleguidist) with integration to [SourceJS](http://sourcejs.com) platform.

[Original styleguidist example](http://sapegin.github.io/react-styleguidist/).
(example with SourceJS will be available later)

![](https://s3.amazonaws.com/f.cl.ly/items/3i0E1D1L1c1m1s2G1d0y/Screen%20Recording%202015-09-24%20at%2009.49%20AM.gif)

To add automatically generated React props docs use [sourcejs-react-docgen](https://github.com/sourcejs/sourcejs-react-docgen) plugin. Check [SourceJS React bundle example](http://github.com/sourcejs/react-styleguidist-example) for more insights.

## Installation

```
cd sourcejs-project
npm install sourcejs-react-styleguidist --save
```

After re-running your SourceJS app, plugin will be loaded automatically.

### Important configs

Configure path to components in SourceJS `options.js` file:

```javascript
var path = require('path');

module.exports = {
	plugins: {
		reactStyleguidist: {
			rootDir: path.join(global.userPath, 'specs'),
			components: './**/*.js'
		}
	}
};
```

See Configuration section below for the list of available options.

## Documenting components

Examples are written in Markdown where any code blocks will be rendered as a react components. By default any `readme.md` in the component folder is treated as an examples file but you can change it with the `getExampleFilename` option.

	React component example:
	
	```jsx
	<Button size="large">Push Me</Button>
	```
	
	Any [Markdown](http://daringfireball.net/projects/markdown/):
	
	* Foo;
	* bar;
	* baz.

## Configuration

Use SourceJS `options.js` for deep plugin configuration.

* **`rootDir`**
  Type: `String`, required
  Your components sources root folder (eg. `./lib`). Should not point to a folder with the `node_modules` folder.

* **`components`**
  Type: `String` or `Function`, required
  - when `String`: a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) that matches all your component modules. Relative to the `rootDir`.
  - when `Function`: function that returns an array of modules.

  If your components look like `components/Button.js` or `components/Button/Button.js` or `components/Button/index.js`:

  ```javascript
  components: './components/**/*.js',
  ```

  If your components look like `components/Button/Button.js` + `components/Button/index.js`:

  ```javascript
  components: function(config, glob) {
  	return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
  		return /\/[A-Z][a-z]*\.js$/.test(module);
  	});
  },
  ```

* **`highlightTheme`**
  Type: `String`, default: `base16-light`
  [CodeMirror theme](http://codemirror.net/demo/theme.html) name to use for syntax highlighting in examples.

* **`getExampleFilename`**
  Type: `Function`, default: finds `readme.md` in the component folder
  Function that returns examples file path for a given component path.

  For example, instead of `readme.md` you can use `ComponentName.examples.md`:

  ```javascript
  getExampleFilename: function(componentpath) {
  	return componentpath.replace(/\.jsx?$/,   '.examples.md');
  }
  ```

* **`updateWebpackConfig`**
  Type: `Function`, optional
  Function that allows you to modify Webpack config for style guide:

  ```javascript
  updateWebpackConfig: function(webpackConfig, env) {
  	if (env === 'development') {
  		/* ... modify config ... */
  	}
  	return webpackConfig;
  }
  ```

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

---

## License

The MIT License, see the included [License.md](License.md) file.
