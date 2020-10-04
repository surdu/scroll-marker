const etch = require('etch');
const $ = etch.dom;

module.exports =
class Marker {
	constructor({layer, line}) {
		var linesScrollPastEnd = 0;
		if (atom.config.get('editor.scrollPastEnd')) {
			const fontSize = atom.config.get('editor.fontSize');
			const lineHeight = atom.config.get('editor.lineHeight');
			const linesVisibleOnMaxScroll = 3;
			const linesOnOneScreen = parseInt(layer.markerView.editor.getHeight() / (fontSize * lineHeight), 10);
			linesScrollPastEnd = linesOnOneScreen - linesVisibleOnMaxScroll;
		}

		var lineCount = layer.markerView.editor.getScreenLineCount() + linesScrollPastEnd;
		var percent = ((line + 1) * 100) / lineCount;

		this.style = {
			top: `${percent}%`,
			backgroundColor: layer.color
		};

		etch.initialize(this);
	}

	update() {
		return etch.update(this);
	}

	render () {
		return (
			$.div({
				className: `scroll-marker`,
				style: this.style
			})
		);
	}

	destroy() {
		etch.destroy(this);
	}
};
