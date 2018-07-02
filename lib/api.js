const ScrollMarkerView = require("./scroll-marker-view");
const editorMap = new WeakMap();

module.exports = {
	// DEPRECATED
	scrollMarkerViewForEditor(editor) {
		var scrollMarkerView = editorMap.get(editor);

		if (!scrollMarkerView) {
			scrollMarkerView = new ScrollMarkerView();
			scrollMarkerView.attachToEditor(editor);
			editorMap.set(editor, scrollMarkerView);
		}

		return scrollMarkerView;
	},

	getLayer(editor, name, color) {
		return this.scrollMarkerViewForEditor(editor).getLayer(name, color);
	}
};
