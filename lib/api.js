const ScrollMarkerView = require("./scroll-marker-view");
const editorMap = new WeakMap();

module.exports = {
	scrollMarkerViewForEditor(editor) {
		var scrollMarkerView = editorMap.get(editor);

		if (!scrollMarkerView) {
			scrollMarkerView = new ScrollMarkerView();
			scrollMarkerView.attachToEditor(editor);
			editorMap.set(editor, scrollMarkerView);
		}

		return scrollMarkerView;
	}
};
