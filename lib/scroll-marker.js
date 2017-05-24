const etch = require('etch');
const $ = etch.dom;

module.exports =
class ScrollMarker {
	constructor(layer, line) {
		var lineCount = layer.markerView.editor.getLineCount();
		var percent = (line * 100) / lineCount;

		etch.initialize(this);

		// set marker position
		this.element.style.top = `${percent}%`;

		// set marker's colors
		this.element.style.backgroundColor = layer.color;

		layer.element.appendChild(this.element);
	}

	update() {
	}

	render () {
		return (
			$.div({className: `scroll-marker`})
		);
	}

	destroy() {
		etch.destroy(this);
	}
};
