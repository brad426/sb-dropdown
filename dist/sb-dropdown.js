(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Dropdown = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var assign = require('object-assign');

var Dropdown = function(el, options) {

    // Merge default options with user options
    this.options = assign({
        autoHide: true,
        hideOnPanelClick: true
    }, options);
    
    // Bind callbacks to "this" scope
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onClickOutsidePanel = this.onClickOutsidePanel.bind(this);
    this.preventPanelClose = this.preventPanelClose.bind(this);

    if( ! el ) return console.error('Dropdown:', 'Missing required element argument.');
    this.el = el;
    this.el.addEventListener('click', this.onTriggerClick);

    this.dropdownPanel = this.findPanel();
    if( ! this.dropdownPanel ) return console.error('Dropdown:', 'Unable to find panel for', this.el);

    if(this.options.hideOnPanelClick === false)
        this.dropdownPanel.addEventListener('click', this.preventPanelClose);

    this.setPanelState(false);
}

Dropdown.prototype = {

    constructor: Dropdown,

    options: null,
    isOpen: false,

    render: function() {        
        this.dropdownPanel.style.display = this.isOpen ? '' : 'none';
    },

    /**
     * Find the panel associated with this dropdown.
     * If a custom panel selector value was specified via the "data-panel" attribute,
     * then use that value as a selector to find the panel, otherwise search for the panel
     * by looking for a child element of this dropdown the has a "data-panel" attribute.
     */
    findPanel: function() {
        var panelSelector = this.el.getAttribute('data-panel');
        var panel = panelSelector ?
                    document.body.querySelector( panelSelector ) :
                    this.el.querySelector('[data-panel]');

        return panel;
    },

    setPanelState: function(open) {
        this.isOpen = open;
        this.render();

        if(this.isOpen) {
            // If we need to close the panel when someone clicks outside of the dropdown
            if(this.options.autoHide) {
                var self = this;
                // Wait until the current call stack has cleared before adding the event listener
                setTimeout(function() {
                    window.addEventListener('click', self.onClickOutsidePanel);
                }, 0);
            }
        }
        else {
            window.removeEventListener('click', this.onClickOutsidePanel);
        }
    },

    /**
     * When the trigger element is clicked, toggle the state of the panel.
     */
    onTriggerClick: function(e) {
        this.setPanelState( ! this.isOpen );
    },

    /**
     * Automatically close the panel when the user clicks outside of the panel.
     */
    onClickOutsidePanel: function(e) {
        this.setPanelState(false);
    },

    /**
     * Stop click-events from bubbling up to the dropdown element (or window) and causing the
     * panel to close when the user interacts with elements inside of the panel.
     */
    preventPanelClose: function(e) {
        e.stopPropagation();
    },

    //////////////////////////////////
    // Methods intended for public use

    open: function() {
        this.setPanelState(true);
    },

    close: function() {
        this.setPanelState(false);
    },

    toggle: function() {
        this.setPanelState( ! this.isOpen );
    },

    destroy: function(e) {
        this.el.removeEventListener('click', this.onTriggerClick);
        this.dropdownPanel.removeEventListener('click', this.preventPanelClose);
        window.removeEventListener('click', this.onClickOutsidePanel);
    }
};

module.exports = Dropdown;
},{"object-assign":2}],2:[function(require,module,exports){
/* eslint-disable no-unused-vars */
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}]},{},[1])(1)
});