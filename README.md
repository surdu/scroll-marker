# Scroll Marker

This is a base package for [Atom](https://atom.io/) that provides the functionality for other atom packages (see list below) to overlay markers on the editor's scroll bar.

<img width="664" alt="screen shot 2018-06-20 at 21 51 40" src="https://user-images.githubusercontent.com/11520795/41678646-40497f28-74d4-11e8-8625-d043f96e9bb8.png">

That means, in order to get any use out of it, you also need to install one of the packages bellow.

## Packages powered by Scroll Marker:

Name | What it highlights
-----|------------------
 [`find-scroll-marker`](https://atom.io/packages/find-scroll-marker) | search results
 [`lint-scroll-marker`](https://atom.io/packages/lint-scroll-marker) | lint errors found by [linter](https://atom.io/packages/linter), [atom-ide-ui](https://atom.io/packages/atom-ide-ui) or [nuclide](https://atom.io/packages/nuclide)

## Developer documentation

The next part is addressed to developers who want to use the services provided by this package in order to create their own scroll bar marker package or to add scroll bar highlight capabilities to their packages.

If you're new to Atom's Services API I would strongly encourage you to first read the documentation for [Services API](https://flight-manual.atom.io/behind-atom/sections/interacting-with-other-packages-via-services/) and their [nice blog post](http://blog.atom.io/2015/03/25/new-services-API.html) about this topic.

The first thing that is needed is declare in your plugin's `package.json` that you want to consume the scroll-marker service:

```js
{
  "name": "example-scroll-marker",
  "main": "lib/index.js",
  "version": "0.0.0",

  // ...

  "consumedServices": {
    "scroll-marker": {
      "versions": {
        "0.1.0": "consumeScrollMarker"
      }
    }
  }
}
```

Then, in your main js file (in this case `lib/index.js`) add the `consumeScrollMarker` method:

```js
module.exports = {
  activate() {
    // ...
  },

  consumeScrollMarker(scrollMarkerAPI) {
    const markerLayer = scrollMarkerAPI.getLayer(editor, "example-layer", "#00ff00");
    markerLayer.addMarker(2); //adds marker for line 3
  },

  deactivate() {
    // ...
  }
};
```

This gives you a reference to the scroll-marker API that you can use to add a [`Marker Layer`](#marker-layer) to the editor's scroll bar. [`Marker Layer`](#marker-layer) is the component responsible with managing the markers on the scroll bar.

## API

### Methods
<table>
	<tr>
		<th>Name</td>
		<th>Description</td>
	</tr>
	<tr>
		<th>getLayer(editor, name, color)</th>
		<td>
			Creates and returns a singleton instance of [`Marker Layer`](#marker-layer). That means there will be only one instance of [`Marker Layer`](#marker-layer) for a given editor/name combination.
			<br>
			This [`Marker Layer`](#marker-layer) instance is what you'll use to add/remove markers to the scroll bar. All Markers added to this layer will have the specified color.

			<br /><br />

			**_Arguments:_**
			<ul>
				<li>
					**_editor_** - an editor instance, usually acquired by using [observeTextEditors](https://atom.io/docs/api/v1.28.0/Workspace#instance-observeTextEditors)
				</li>
				<li>
					**_name_** - a unique name for the layer, usually the name of your package
				</li>
				<li>
					**_color_** - CSS color that you want the markers added to this layer to be
				</li>
			</ul>
		</td>
	</tr>
</table>

## Marker Layer

### Methods
<table>
	<tr>
		<th>Name</td>
		<th>Description</td>
	</tr>

	<tr>
		<th>addMarker(line)</th>
		<td>
			Adds a marker on the marker layer at the specified line.

			<br /><br />

			**_Arguments:_**
			<ul>
				<li>
					**line** - line number you want to add the marker to. Note that the first line number is 0.
				</li>
			</ul>
		</td>
	</tr>

	<tr>
		<th>syncToMarkerLayer(markerLayer)</th>
		<td>
			Sync the markers on the scroll marker layer with the markers on a [DisplayMarkerLayer](https://atom.io/docs/api/v1.9.5/DisplayMarkerLayer)

			<br /><br />

			**_Arguments:_**
			<ul>
				<li>
					**markerLayer** - an instance of [DisplayMarkerLayer](https://atom.io/docs/api/v1.9.5/DisplayMarkerLayer) that is usually used to highlight text in the editor
				</li>
			</ul>
		</td>
	</tr>

</table>
