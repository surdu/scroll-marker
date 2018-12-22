const etch = require('etch');
const $ = etch.dom;

module.exports =
class Marker {
	constructor({layer, line}) {
		var linesScrollPastEnd = 0;
		if (atom.config.get('editor.scrollPastEnd')) {
			const fontSize = atom.config.get('editor.fontSize');
			const lineHeight = atom.config.get('editor.lineHeight');
			linesScrollPastEnd = (atom.windowDimensions.height - 96) / (fontSize * lineHeight);
		}
		var lineCount = layer.markerView.editor.getLineCount() + linesScrollPastEnd;
		var percent = (line * 100) / lineCount;

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
