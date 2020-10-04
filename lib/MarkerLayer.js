const etch = require('etch');
const $ = etch.dom;

const Marker = require("./Marker");

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
			setTimeout(async function() {
				let atomMarkers = markerLayer.getMarkers();

				await this.clear();

				for (const marker of atomMarkers) {
					let line = marker.getScreenRange().start.row;
					this.addMarker(line);
				}
			}.bind(this));
		}.bind(this));
	}

	addMarker(line) {
		if (!this.markers.get(line)) {
			this.markers.set(line, $(Marker, {
				layer: this,
				line: line
			}));

			this.update();
		}
	}

	addMarkers(startLine, endLine) {
		for (let line = startLine; line <= endLine; line++) {
			if (!this.markers.get(line)) {
				this.markers.set(line, $(Marker, {
					layer: this,
					line: line
				}));
			}
		}

		this.update();
	}

	clear() {
		this.markers.clear();
		return this.update();
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
