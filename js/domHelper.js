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
        // replace the leading and trailing newlines (side-effect of using template, the newline after the <script> tag is included).
        result = result.trim();
      } else {
        result = "No element found for ID: '" + elementId + "'";
      }

      return result;
    },

    getInnerHtmlAsArray: function(elementId) {
      var result = this.getInnerHtml(elementId).split("\n");

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
     * Return the value of the style property, for the element with the given elementId.
     *
     * @param elementId - ID of the target element.
     * @param stylePropertyName - name of the style property to retrieve the value for.
     */
    getStylePropertyValue: function(elementId, stylePropertyName) {
      var result;
      var element = document.getElementById(elementId);

      if (element == null) {
        result = "* ERROR * Element not found: " + elementId;
      } else {
        result = window.getComputedStyle(element).getPropertyValue(stylePropertyName);
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
      insertLine("<" + tagName + ">" + innerHtml + "</" + tagName + ">");
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
      insertLine("<" + tagName + tagAttributes + ">" + innerHtml + "</" + tagName + ">");
    },

    xmlEscape: function(rawString) {
      var result = rawString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      return result;
    },

    /*
     * Returns the given value if not null, otherwise returns the given defaultValue.
     *
     * @param value - value to return if not null.
     * @param defaultValue - defaultValue to return if value is null.
     */
    coalesce: function(value, defaultValue) {
      var result = (value === undefined || value === "") ? defaultValue : value;

      return result;
    },

    show: function(elementId) {
      var element = document.getElementById(elementId);

      element.style.display = 'block';
    },

    hide: function(elementId) {
      var element = document.getElementById(elementId);

      element.style.display = 'none';
    }
  };

  // ------------------------------------------------------------------
  // Private functions
  // ------------------------------------------------------------------

  /*
   * Inlines given text into document (equivalent to document.writeln).
   *
   * @param text - text to write.
   */
  function insertLine(text) {
    document.writeln(text);
  }
}());
