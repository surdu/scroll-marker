const etch = require('etch');
const $ = etch.dom;

const MarkerLayer = require("./marker-layer");

module.exports =
class ScrollMarkerView {
	constructor() {
		etch.initialize(this);
	}

	attachToEditor(editor) {
		var editorView = atom.views.getView(editor);
		var scrollBarView = editorView.getElementsByClassName("vertical-scrollbar")[0];
		scrollBarView.parentNode.insertBefore(this.element, scrollBarView.nextSibling);
	}

	addLayer(layerClass) {
		var layer = new MarkerLayer(this, layerClass);
		return layer;
	}

	update() {
	}

	render () {
		return (
			$.div({className: "scroll-marker-view"})
		);
	}
};
