# Scroll Marker

[![Actions Status](https://github.com/surdu/scroll-marker/workflows/Tests/badge.svg)](https://github.com/surdu/scroll-marker/actions)
[![dependencies Status](https://david-dm.org/surdu/scroll-marker/status.svg)](https://david-dm.org/surdu/scroll-marker)
[![Buy me a coffee](https://raw.githubusercontent.com/surdu/surdu/master/ko-fi.svg)](https://ko-fi.com/surdu)

This is a base package for [Atom](https://atom.io/) that provides the functionality for other atom packages (see list below) to highlight important things on the editor's scroll bar.

![Screenshot](https://user-images.githubusercontent.com/11520795/41678646-40497f28-74d4-11e8-8625-d043f96e9bb8.png)

That means, in order to get any use out of this package, you also need to install one of the packages bellow.

## Packages powered by Scroll Marker:

Name | What it highlights | Marker Layer Class
-----|--------------------|-------------------
[`find-scroll-marker`](https://atom.io/packages/find-scroll-marker) | Search results. | `.find-marker-layer`
[`lint-scroll-marker`](https://atom.io/packages/lint-scroll-marker) | Lint errors found by [linter](https://atom.io/packages/linter), [atom-ide-ui](https://atom.io/packages/atom-ide-ui) or [nuclide](https://atom.io/packages/nuclide). | `.link-scroll-marker-warn`, `.lint-scroll-marker-error` or `.link-scroll-marker-info`
[`highlight-selected`](https://atom.io/packages/highlight-selected) | Occurrences of the selected text. Scrollbar highlight requires enabling in the package settings. | `.highlight-selected-selected-marker-layer`

## Customize marker color

If you would like to customize the color of the marker for one of the scroll marker types, place the following CSS in you Atom stylesheet:

```css
<marker-layer-class> .scroll-marker {
	background-color: <css-color> !important;
}
```

Substitute `<marker-layer-class>` with one of the marker layer classes from the table above and `<css-color>` with a valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)

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

Then, in your main JS file (in this case `lib/index.js`) add the `consumeScrollMarker` method:

```js
module.exports = {
  activate() {
    // ...
  },

  consumeScrollMarker(api) {
    // Use `api` here
  },

  deactivate() {
    // ...
  }
};
```

This will give you the reference to the scroll-marker API.

## API

### getLayer(editor, name, color)

Creates and returns a singleton instance of [`Marker Layer`](#marker-layer). That means there will be only one instance of [`Marker Layer`](#marker-layer) for a given editor/name combination.

This [`Marker Layer`](#marker-layer) instance is what you'll use to add/remove markers to the scroll bar. All Markers added to this layer will have the specified color.

**_Arguments:_**
 - **_editor_** - an editor instance, usually acquired by using [observeTextEditors](https://atom.io/docs/api/v1.28.0/Workspace#instance-observeTextEditors)
 - **_name_** - a unique name for the layer, usually the name of your package
 - **_color_** - CSS color that you want the markers added to this layer to be

**_Example:_**
```js
consumeScrollMarker(api) {
  atom.workspace.observeTextEditors(function(editor) {
    const layer = api.getLayer(editor, "example-layer", "#00ff00");
    // ...
  });
}
```

## Marker Layer

### addMarker(line)

Adds a marker on the marker layer at the specified line.


**_Arguments:_**
 - **line** - line number you want to add the marker to. Note that the first line number is 0.

**_Example:_**
```js
consumeScrollMarker(api) {
  atom.workspace.observeTextEditors(function(editor) {
    const layer = api.getLayer(editor, "example-layer", "#00ff00");
    layer.addMarker(2);
  });
}
```

---

### syncToMarkerLayer(markerLayer)

Sync the markers on the scroll marker layer with the markers on a [DisplayMarkerLayer](https://atom.io/docs/api/v1.9.5/DisplayMarkerLayer).

**_Arguments:_**
 - **markerLayer** - an instance of [DisplayMarkerLayer](https://atom.io/docs/api/v1.9.5/DisplayMarkerLayer) that is usually used to highlight text in the editor

**_Example:_**
```js
consumeScrollMarker(api) {
  atom.workspace.observeTextEditors(function(editor) {
    const scrollLayer = api.getLayer(editor, "example-layer", "#00ff00");
    // `findApi` was obtained similarly to `api` but from find-and-replace package
    const searchLayer = findApi.resultsMarkerLayerForTextEditor(editor);

    scrollLayer.syncToMarkerLayer(searchLayer);
  });
}
```

For a detailed `syncToMarkerLayer` working example you can checkout the [find-scroll-marker](https://github.com/surdu/find-scroll-marker) source code.
