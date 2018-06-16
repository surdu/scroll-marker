const etch = require('etch');
const $ = etch.dom;

const MarkerLayer = require("./marker-layer");

module.exports =
class ScrollMarkerView {
	constructor() {
		this.markerLayerMap = {};
		etch.initialize(this);
	}

	attachToEditor(editor) {
		this.editor = editor;
		const editorView = atom.views.getView(editor);
		const scrollBarView = editorView.getElementsByClassName("vertical-scrollbar")[0];
		scrollBarView.parentNode.insertBefore(this.element, scrollBarView.nextSibling);
	}

	getLayer(className, color) {
		var layer = this.markerLayerMap[className];
		if (!layer) {
			layer = new MarkerLayer(this, className, color);
			this.element.appendChild(layer.element);
			this.markerLayerMap[className] = layer;
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
