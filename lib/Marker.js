const etch = require('etch');
const $ = etch.dom;

var fontSize = atom.config.defaultSettings.editor.fontSize;
var lineHeight = atom.config.defaultSettings.editor.lineHeight;

if (atom.config.settings.editor.fontSize !== undefined){
	fontSize = atom.config.settings.editor.fontSize;
}
if (atom.config.settings.editor.lineHeight !== undefined){
	lineHeight = atom.config.settings.editor.lineHeight;
}


module.exports =
class Marker {
	constructor({layer, line}) {
		var linesScrollPastEnd = 0;
		if (atom.config.settings.editor.scrollPastEnd){
			linesScrollPastEnd = (atom.windowDimensions.height-96)/(fontSize*lineHeight);
		}
		var lineCount = layer.markerView.editor.getLineCount()+linesScrollPastEnd;
		var percent = (line * 100) / lineCount;

		this.style = {
			top: `${percent}%`,
			backgroundColor: layer.color
		};

		etch.initialize(this);
	}

	update() {
		return etch.update(this);
	}

	render () {
		return (
			$.div({
				className: `scroll-marker`,
				style: this.style
			})
		);
	}

	destroy() {
		etch.destroy(this);
	}
};
