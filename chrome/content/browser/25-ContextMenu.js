
const EXPORT = ['ContextMenu'];

elementGetter(this, 'addentry', 'hBookmark-menu-addentry', document);
elementGetter(this, 'addlink', 'hBookmark-menu-addlink', document);
elementGetter(this, 'showentry', 'hBookmark-menu-showentry', document);
elementGetter(this, 'showlink', 'hBookmark-menu-showlink', document);
elementGetter(this, 'searchtext', 'hBookmark-menu-searchtext', document);

var ContextMenu = {
    registerEventListeners: function() {
        let contextMenu = document.getElementById("contentAreaContextMenu");
        contextMenu.addEventListener('popupshowing', ContextMenu.contextMenuHandler, false);
    },
    unregisterEventListeners: function() {
        // contextMenu.removeEventListenr('popupshowing', ContextMenu.contextMenuHandler, false);
    },
    contextMenuHandler: function(ev) {
        if (gContextMenu.onTextInput || 
            gContextMenu.onMailtoLink || 
            gContextMenu.onMathML || 
            gContextMenu.isTextSelected || 
            (gContextMenu.onImage && !gContextMenu.onLink) 
        ) {
            addentry.setAttribute('hidden', true);
            addlink.setAttribute('hidden', true);
            showentry.setAttribute('hidden', true);
            showlink.setAttribute('hidden', true);
            if (gContextMenu.isTextSelected) {
                let str = searchtext.getAttribute('label').split(':')[0] + ':';
                str += ' "' + document.commandDispatcher.focusedWindow.getSelection().toString() + '" ';
                searchtext.setAttribute('label', str);
                searchtext.removeAttribute('hidden');
            } else {
                searchtext.setAttribute('hidden', true);
            }
            return;
        }
        if (gContextMenu.onLink) {
            addentry.setAttribute('hidden', true);
            showentry.setAttribute('hidden', true);
            addlink.removeAttribute('hidden');
            showlink.removeAttribute('hidden');
            searchtext.setAttribute('hidden', true);
        } else {
            addentry.removeAttribute('hidden');
            addlink.setAttribute('hidden', true);
            showentry.removeAttribute('hidden');
            showlink.setAttribute('hidden', true);
            searchtext.setAttribute('hidden', true);
        }
    },
}

window.addEventListener('load', ContextMenu.registerEventListeners, false)
window.addEventListener('unload', ContextMenu.unregisterEventListeners, false);
