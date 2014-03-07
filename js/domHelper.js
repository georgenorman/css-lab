/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Simple dom functions.
 ~ --------------------------------------------------------------
 ~
 */

var domHelperModule = (function() {
  "use strict";

  return {
    /*
     * Return the inner HTML from an element with the given elementId.
     * Useful for returning multi-line strings from template blocks.
     *
     * @param elementId - ID of the element with the desired HTML.
     */
    getInnerHtml: function(elementId) {
      var result;
      var element = document.getElementById(elementId);

      if (element) {
        result = element.innerHTML;
        // replace the first new line (side-effect of using template, the newline after the <script> tag is included).
        result = result.replace("\n", "");
      } else {
        result = "No element found for ID: '" + elementId + "'";
        console.log("ERROR: getInnerHtml found " + result);
      }

      return result;
    },

    /*
     * Return the first element that has an attribute with the given attributeName.
     *
     * @param attributeName - name of the attribute of targeted element.
     */
    getFirstElementByAttributeName: function(attributeName) {
      var result = null;
      var elementList = document.querySelectorAll("[" + attributeName + "]");

      if (elementList === null || elementList.length === 0) {
        console.log("ERROR: getFirstElementByAttributeName didn't find an element with an attribute named: " + attributeName);
      } else {
        result = elementList[0];
      }

      return result;
    },

    /*
     * Inserts a tag, with the given tagName, and inserts the given innerHtml inside the element.
     *
     * @param tagName - name of tag (e.g., h4 => <h4>).
     * @param innerHtml - HTML to write inside of element.
     */
    insertElement: function(tagName, innerHtml) {
      this.insertLine("<" + tagName + ">" + innerHtml + "</" + tagName + ">");
    },

    /*
     * Inserts a tag, with the given tagName and tagAttributes, and inserts the given innerHtml inside the element.
     *
     * @param tagName - name of tag (e.g., h4 => <h4>).
     * @param tagAttributes - attributes of tag element (e.g., class="foo" => <someTag class="foo">).
     * @param innerHtml - HTML to write inside of element.
     */
    insertElementWithTagAttributes: function(tagName, tagAttributes, innerHtml) {
      tagAttributes = (tagAttributes.length > 0) ? " " + tagAttributes : tagAttributes;
      this.insertLine("<" + tagName + tagAttributes + ">" + innerHtml + "</" + tagName + ">");
    },

    /*
     * Inlines given text into document (equivalent to document.writeln).
     *
     * @param text - text to write.
     */
    insertLine: function(text) {
      document.writeln(text);
    }

  };
}());
