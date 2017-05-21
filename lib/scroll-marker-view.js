const etch = require('etch');
const $ = etch.dom;

const MarkerLayer = require("./marker-layer");

var markerLayerMap = {};

module.exports =
class ScrollMarkerView {
	constructor() {
		etch.initialize(this);
	}

	attachToEditor(editor) {
		this.editor = editor;
		var editorView = atom.views.getView(editor);
		var scrollBarView = editorView.getElementsByClassName("vertical-scrollbar")[0];
		scrollBarView.parentNode.insertBefore(this.element, scrollBarView.nextSibling);
	}

	getLayer(className) {
		var layer = markerLayerMap[className];
		if (!layer) {
			layer = new MarkerLayer(this, className);
			this.element.appendChild(layer.element);
			markerLayerMap[className] = layer;
		}
		return layer;
	}

	update() {
	}

	render () {
		return (
			$.div({className: "scroll-marker-view"})
		);
	}

	destroy() {
		etch.destroy(this);
	}
};
