const etch = require('etch');
const $ = etch.dom;

const ScrollMarker = require("./scroll-marker");

module.exports =
class MarkerLayer {
	constructor(markerView, className, color) {
		this.className = className;
		this.color = color;
		this.markerView = markerView;
		this.markers = {};

		etch.initialize(this);
	}

	syncToMarkerLayer(markerLayer) {
		markerLayer.onDidUpdate(function() {
			let markers = markerLayer.getMarkers();
			for (let f = 0; f < markers.length; f++) {
				let marker = markers[f];
				let line = marker.getBufferRange().start.row + 1;
				this.addMarker(line);
			}
		}.bind(this));
	}

	addMarker(line) {
		var marker = this.markers[line];
		if (!marker) {
			marker = new ScrollMarker(this, line);
			this.markers[line] = marker;
		}
		return marker;
	}

	update() {
	}

	render () {		return (
			$.div({className: `${this.className} scroll-marker-layer`})
		);
	}

	destroy() {
		etch.destroy(this);
	}

};
