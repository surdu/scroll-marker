describe("scroll-marker", function () {

	const scrollMarker = require("../lib/api");

	it("should change layer color", function() {
		atom.workspace.open()
		.then(function(editor) {
			var layer = scrollMarker.getLayer(editor, "test", "#ff0000");
			layer = scrollMarker.getLayer(editor, "test", "#00ff00");
			expect(layer.color).toBe("#00ff00");
		});
	});
});
