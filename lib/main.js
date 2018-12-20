class Package {
	activate() {
		if (localStorage.getItem("notifierDimissed")) {
			return;
		}

		const message = "Install scroll-marker plugins?";
		const desc = "Additional plugins are needed for scroll-marker to be useful.";
		atom.notifications.addInfo(message, {
			description: desc,
			dismissable: true,
			buttons: [
				{
					className: "btn-error",
					text: "Don't show again",
					onDidClick: function() {
						localStorage.setItem("notifierDimissed", true);
						this.model.dismiss();
					}
				},
				{
					text: "Show me a list",
					onDidClick: function() {
						const shell = require("shell");
						shell.openExternal("https://github.com/surdu/scroll-marker#packages-powered-by-scroll-marker");
						localStorage.setItem("notifierDimissed", true);
						this.model.dismiss();
					}
				}
			]
		});
	}

	provideService() {
		return require("./api");
	}
}

module.exports = new Package();
