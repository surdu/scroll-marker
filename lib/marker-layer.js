const etch = require('etch');
const $ = etch.dom;

module.exports =
class MarkerLayer {
	constructor(markerView, className) {
		this.className = className;
	}

	update() {
	}

	render () {
		return (
			$.div({className: `${this.className} scroll-marker-layer`})
		);
	}
};
