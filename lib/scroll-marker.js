const { CompositeDisposable } =  require("atom");

module.exports = {

	subscriptions: null,

	activate(state) {
		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();
		console.log("Activated");
	},

	consumeSearch(searchMarkerLayerForTextEditor) {
		this.subscriptions.add(atom.workspace.observeTextEditors(function(editor) {
			searchMarkerLayerForTextEditor(editor).onDidUpdate(function() {
				console.log("UPDATED");
			})
		}));
	},

	deactivate() {
		this.subscriptions.dispose();
	}
};
