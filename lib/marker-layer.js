const etch = require('etch');
const $ = etch.dom;

const ScrollMarker = require("./scroll-marker");

module.exports =
class MarkerLayer {
	constructor(markerView, className, color) {
		this.className = className;
		this.color = color;
		this.markerView = markerView;

		this.markers = new Map();

		etch.initialize(this);
	}

	syncToMarkerLayer(markerLayer) {
		markerLayer.onDidUpdate(function() {
			setTimeout(function () {
				let atomMarkers = markerLayer.getMarkers();

				this.markers = new Map();
				for (const marker of atomMarkers) {
					let line = marker.getBufferRange().start.row + 1;
					console.log("LINE:", line);
					this.addMarker(line);
				}
			}.bind(this));
		}.bind(this));
	}

	addMarker(line) {
		if (!this.markers.get(line)) {
			console.log("line:", line);
			this.markers.set(line, $(ScrollMarker, {
				layer: this,
				line: line
			}));

			this.update();
		}
	}

	update() {
		return etch.update(this);
	}

	render () {
		return (
			$.div({className: `${this.className} scroll-marker-layer`}, Array.from(this.markers.values()))
		);
	}

	async destroy() {
		await etch.destroy(this);
	}
};
