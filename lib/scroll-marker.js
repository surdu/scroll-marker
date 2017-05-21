const etch = require('etch');
const $ = etch.dom;

module.exports =
class ScrollMarker {
	constructor(layer, line) {
		var lineCount = layer.markerView.editor.getLineCount();
		var percent = (line * 100) / lineCount;

		etch.initialize(this);

		this.element.style.top = `${percent}%`;
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
