# sb-dropdown

> Easily create dropdown menus.

## Install

```sh
$ npm install --save sb-dropdown
```

## Example

##### Your HTML should look something like this
```html
<button class="dropdown btn btn-default">
	Toggle dropdown
	<ul class="dropdown-panel" data-panel>
		<li>thing 1</li>
		<li>thing 2</li>
	</ul>
</button>
```
**Note:** Use the `data-panel` attribute to indicate which element should be shown/hidden when the dropdown is clicked.

##### CSS
```css
.dropdown {
	position: relative;
}

.dropdown-panel {
	position: absolute;
	left: 0;
	top: 100%;
	width: 100%;
	padding: 1em;
	background-color: #eee;
}
```

##### Javascript
```javascript
var Dropdown = require('sb-dropdown');

var toggleEl = document.body.querySelector('.dropdown');
var menu = new Dropdown(toggleEl);
```

---

If you choose to place your `.dropdown-panel` outside of the `.dropdown` element, you must place the `data-panel` attribute on the `.dropdown` element and use it to specify which panel this dropdown will toggle. 
Example: 
```html
<button class="dropdown" data-panel="#panel-1">...</button>
<div id="panel-1" class="dropdown-panel">...</div>
```
Any valid CSS selector can be used as the value for `data-panel`

---

## Usage
```javascript
new dropdown(element[,options])
```

returns an instanace of the dropdown component.

### element
Type: `HTMLElement`

The DOM element that will be used to toggle the hidden content (data-panel) whenever it is clicked.


### options
Type: `Object`

Customise the behaviour of the dropdown component.

#### options.autoHide
Type: `Boolean`
Default: `true`

When true, the dropdown panel will automatically be hidden when a user clicks outside of the dropdown (for example on the `<body>`)

#### options.hideOnPanelClick
Type: `Boolean`
Default: `true`

By default, the dropdown panel is automatically hidden whenever something inside of the panel is clicked. Setting this to false will allow the dropdown panel to remain visible, even when content inside of it is clicked.

## API

### open()
Shows the dropdown panel

### close()
Hides the dropdown panel

### toggle()
The dropdown panel's visibility will be toggled