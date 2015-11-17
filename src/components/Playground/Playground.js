import { Component, PropTypes } from 'react';
import Editor from 'components/Editor';
import Preview from 'components/Preview';
import ReactDOM from 'react-dom';

export default class Playground extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		index: PropTypes.string.isRequired
	}

	constructor(props) {
		super();
		this.state = {
			code: props.code
		};
	}

	handleChange = (newCode) => {
		this.setState({
			code: newCode
		});
	}

	componentDidMount() {
		this.renderEditor(this.props);

		// Force fix improper editor size, TODO: invesitage the cause
		setTimeout(() => {
			this.renderEditor(this.props);
		}, 1000);
	}

	componentDidUpdate() {
		this.renderEditor(this.props);
	}

	componentWillReceiveProps(nextProps) {
		let { code } = nextProps;
		if (code) {
			this.setState({
				code
			});
		}
	}

	getEditorContainer() {
		return document.querySelector('.source_styleguidist_code__' + this.props.index);
	}

	getEditorElement() {
		let { highlightTheme } = this.props;
		let { code } = this.state;

		return (
			<Editor code={code} highlightTheme={highlightTheme} onChange={this.handleChange}/>
		);
	}

	renderEditor() {
		var container = this.getEditorContainer();

		if (container) {
			ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getEditorElement(), this.getEditorContainer());
		}
	}

	render() {
		let { code } = this.state;

		return (
			<Preview code={code} evalInContext={this.props.evalInContext}/>
		);
	}
}
