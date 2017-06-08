const ScrollMarkerManager = require("./scroll-marker-manager");
const editorMap = new WeakMap();

module.exports = {
	scrollMarkerViewForEditor(editor) {
		var scrollMarkerManager = editorMap.get(editor);

		if (!scrollMarkerManager) {
			scrollMarkerManager = new ScrollMarkerManager();
			scrollMarkerManager.attachToEditor(editor);
			editorMap.set(editor, scrollMarkerManager);
		}

		return scrollMarkerManager;
	}
};
