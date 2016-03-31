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
        this.dropdownPanel.classList.toggle('hidden', ! this.isOpen)
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