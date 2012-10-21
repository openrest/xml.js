var xml = xml || {};

xml.Factory = xml.Factory || (function() {
	var self = {};
	
    /** @see strophe#_getIEXmlDom */
    function _getIEXmlDom() {
        var doc = null;
        var docStrings = [
            "Msxml2.DOMDocument.6.0",
            "Msxml2.DOMDocument.5.0",
            "Msxml2.DOMDocument.4.0",
            "MSXML2.DOMDocument.3.0",
            "MSXML2.DOMDocument",
            "MSXML.DOMDocument",
            "Microsoft.XMLDOM"
        ];

        for (var d = 0; d < docStrings.length; d++) {
            if (doc === null) {
                try {
                    doc = new ActiveXObject(docStrings[d]);
                } catch (e) {
                    doc = null;
                }
            } else {
                break;
            }
        }
        
        if (doc === null) {
			throw new Error("Could not find a DOM implementation.");
        }

        return doc;
    }
	
	/** @see strophe.js#_makeGenerator */
	self.create = function(namespace, name, doctype) {
		if (typeof(Ti) !== "undefined") { // Appcelerator Titanium
			return Ti.XML.parseString("<" + name + "></" + name + ">").implementation.createDocument(namespace, name, doctype);
		} else if (typeof(document.implementation.createDocument) !== "undefined") { // modern browsers
			return document.implementation.createDocument(namespace, name, doctype);
        } else { // IE
            var doc = _getIEXmlDom();
            doc.appendChild(doc.createElement(name));
            return doc;
        }
	};

	return self;
}());

// Syntactic sugar
xml.create = xml.create || xml.Factory.create;