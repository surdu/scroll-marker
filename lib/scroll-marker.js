const etch = require('etch');
const $ = etch.dom;

module.exports =
class ScrollMarker {
	constructor({layer, line}) {
		var lineCount = layer.markerView.editor.getLineCount();
		var percent = (line * 100) / lineCount;

		console.log("line:", line, lineCount);

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
			$.div({className: `scroll-marker`, style: this.style})
		);
	}

	destroy() {
		etch.destroy(this);
	}
};
