import { Component, PropTypes } from 'react';

import s from './Props.css';

export default class Props extends Component {
	static propTypes = {
		props: PropTypes.object.isRequired
	}

	unquote(string) {
		return string.replace(/^'|'$/g, '');
	}

	renderRows() {
		let rows = [];
		let { props } = this.props.props;
		for (var name in props) {
			var prop = props[name];
			rows.push(
				<tr key={name}>
					<td className={s.cell}><code>{name}</code></td>
					<td className={s.cell}><code>{this.renderType(prop.type)}</code></td>
					<td className={s.cell}>{this.renderDefault(prop)}</td>
					<td className={s.cell + ' ' + s.cellDesc}>{this.renderDescription(prop)}</td>
				</tr>
			);
		}
		return rows;
	}

	renderType(type) {
		let { name } = type;
		switch (name) {
			case 'arrayOf':
				return `${type.value.name}[]`;
			case 'instanceOf':
				return type.value;
		}
		return name;
	}

	renderDefault(prop) {
		if (prop.required) {
			return '';
		}
		else if (prop.defaultValue) {
			return (
				<code>{this.unquote(prop.defaultValue.value)}</code>
			);
		}
		else {
			return (
				<span className={s.optional}>Optional</span>
			);
		}
	}

	renderDescription(prop) {
		let isEnum = prop.type.name === 'enum';
		let isUnion = prop.type.name === 'union';
		return (
			<div>
				{prop.description}
				{prop.description && isEnum && ' '}
				{isEnum && this.renderEnum(prop)}
				{isUnion && this.renderUnion(prop)}
			</div>
		);
	}

	renderEnum(prop) {
		if (!Array.isArray(prop.type.value)) {
			return <span>{prop.type.value}</span>;
		}
		let values = prop.type.value.map(({ value }) => (
			<li className={s.listItem} key={value}>
				<code>{this.unquote(value)}</code>
			</li>
		));
		return (
			<span>One of: <ul className={s.list}>{values}</ul></span>
		);
	}

	renderUnion(prop) {
		if (!Array.isArray(prop.type.value)) {
			return <span>{prop.type.value}</span>;
		}
		let values = prop.type.value.map((value) => (
			<li className={s.listItem} key={value.name}>
				<code>{this.renderType(value)}</code>
			</li>
		));

		return (
			<span>One of type: <ul className={s.list}>{values}</ul></span>
		);
	}

	render() {
		return (
			<div className={s.root}>
				<h3 className={s.heading}>Props</h3>
				<table className={s.table}>
					<thead className={s.tableHead}>
						<tr>
							<th className={s.cellHeading}>Name</th>
							<th className={s.cellHeading}>Type</th>
							<th className={s.cellHeading}>Default</th>
							<th className={s.cellHeading + ' ' + s.cellDesc}>Description</th>
						</tr>
					</thead>
					<tbody className={s.tableBody}>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		);
	}
}
