/*!
  ~ Copyright (c) 2014 George Norman.
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ --------------------------------------------------------------
  ~ Simple support functions for 'CSS Summary'.
  ~ --------------------------------------------------------------
  ~
 */

var cssSummaryModule = (function(domHelper) {
  "use strict";

  return {
    /*
     * Insert, as a <style> block, using the text from the element with the given templateId.
     *
     * @param templateId - ID of the element containing the CSS code to insert.
     */
    insertStyleFromTemplate: function(templateId) {
      var styleData = domHelper.getInnerHtml(templateId);

      domHelper.insertElement("style", styleData);
    },

    /*
     * Insert a heading, followed by a <code> block with the text from the element of the given templateId.
     *
     * @param templateId - ID of the element containing the HTML or JavaScript code to insert.
     * @param heading - <h4> heading for the div block.
     */
    insertCodeExampleWithHeadingFromTemplate: function(templateId, heading, lang) {
      domHelper.insertElement("h4", heading);

      this.insertCodeExampleFromTemplate(templateId, lang);
    },

    /*
     * Insert a <code> block, with the HTML-escaped text from the element with the given templateId.
     *
     * @param templateId - ID of the element containing the HTML or JavaScript code to insert.
     */
    insertCodeExampleFromTemplate: function(templateId, lang) {
      var result = "<ol>";
      var codeLines = domHelper.getInnerHtmlAsArray(templateId);

      // create a list item for each line (to display line numbers).
      for (var i=0; i<codeLines.length; i++) {
        var escapedCodeLine = domHelper.xmlEscape(codeLines[i]);
        // @-@:p0 Highlighter should be applied to the complete inner HTML, and not line-by-line as done here, but
        //        the closing list-item (</li>) breaks the span with the style, so keeping it simple and broken, for now.
        result += "<li> " + this.highlighter(escapedCodeLine, lang) + "</li>"
      }

      // close the list
      result += "</ol>";

      domHelper.insertElement("code", result);
    },

    /*
     * A crude (hack), single-line code highlighter, that only highlights basic code elements (e.g., some c-style comments, etc).
     * Borderline suitable for the simple code examples in the CSS Lab.
     */
    highlighter: function(code, lang) {
      var result = code;

      // simple quoted strings
      result = result.replace(/(["'])(.*?)\1/gm, "[[quoted-string]]$1$2$1[[/quoted-string]]"); // matches quoted string: e.g., "foo"

      // simple comments
      result = result.replace(/(\/\/.*$)/gm, "[[comment]]$1[[/comment]]"); // matches comment: e.g., // comment
      result = result.replace(/(\/\*[\s\S]+?\*\/)/gm, "[[comment]]$1[[/comment]]"); // matches comment: e.g., /* comment */

      if (lang === '*ml') {
        // simple tags
        result = result.replace(/(&lt;\w+&gt;|&lt;\w+|&lt;\/\w+&gt;)/gm, "[[tag-name]]$1[[/tag-name]]"); // matches tag: e.g., <div ...> or </div>

        // simple xml attributes
        result = result.replace(/(\w+=)/gm, "[[attribute-name]]$1[[/attribute-name]]"); // matches attribute name: e.g., foo=

        // un-escape
        result = result.replace(/\[\[tag-name\]\]/gm, "<span class='highlight-tag-name'>").replace(/\[\[\/tag-name\]\]/gm, "</span>");
        result = result.replace(/\[\[attribute-name\]\]/gm, "<span class='highlight-attribute-name'>").replace(/\[\[\/attribute-name\]\]/gm, "</span>");
      } else if (lang === 'css') {
        // selector
        result = result.replace(/(.*\{|\})/gm, "[[css-selector]]$1[[/css-selector]]"); // matches css selector: e.g., .foo {

        // property
        result = result.replace(/(.*:)/gm, "[[css-property]]$1[[/css-property]]"); // matches css property: e.g., margin-top:

        // un-escape
        result = result.replace(/\[\[css-selector\]\]/gm, "<span class='highlight-css-selector'>").replace(/\[\[\/css-selector\]\]/gm, "</span>");
        result = result.replace(/\[\[css-property\]\]/gm, "<span class='highlight-css-property'>").replace(/\[\[\/css-property\]\]/gm, "</span>");
      }

      // un-escape
      result = result.replace(/\[\[quoted-string\]\]/gm, "<span class='highlight-comment'>").replace(/\[\[\/quoted-string\]\]/gm, "</span>");
      result = result.replace(/\[\[comment\]\]/gm, "<span class='highlight-comment'>").replace(/\[\[\/comment\]\]/gm, "</span>");

      return result;
    },

    /*
     * Insert, as a <div> block, with the text from the element with the given templateId.
     *
     * @param templateId - ID of the element containing the text to insert.
     * @param heading - <h4> heading for the div block.
     */
    insertRenderedResultWithHeadingFromTemplate: function(templateId, heading) {
      var rawHtml = domHelper.getInnerHtml(templateId);

      domHelper.insertElement("h4", heading);
      domHelper.insertElementWithTagAttributes("div", "class='rendered-result'", rawHtml);
    },

    /*
     * Convenience function that inserts the CSS style, CSS style code-example, HTML code-example
     * and then the HTML for the final rendered result, using the elements identified by the given
     * cssTemplateId and htmlTemplateId.
     *
     * @param cssTemplateId - ID of the element containing the CSS code to insert.
     * @param htmlTemplateId - ID of the element containing the HTML code to insert.
     */
    insertStyleWithExampleAndResultWithExample: function(cssTemplateId, htmlTemplateId) {
      this.insertStyleFromTemplate(cssTemplateId);
      this.insertCodeExampleWithHeadingFromTemplate(cssTemplateId, 'CSS', 'css');
      this.insertCodeExampleWithHeadingFromTemplate(htmlTemplateId, 'HTML', '*ml');
      this.insertRenderedResultWithHeadingFromTemplate(htmlTemplateId, 'Rendered Result');
    },

    /*
     * Convenience function that inserts the CSS style, CSS style code-example, HTML code-example
     * and the HTML for the final rendered result, using the elements identified by the given
     * templatePrefixId. The strings "Css" and "Html" will be appended to the given templatePrefixId
     * to identify the template blocks containing the CSS and HTML code to be used by the example.
     *
     * @param templatePrefixId - prefix of the element containing the CSS code and the HTML code to insert.
     */
    insertCssHtmlExample: function(templatePrefixId) {
      this.insertStyleWithExampleAndResultWithExample(templatePrefixId+"Css", templatePrefixId+"Html");
    },

    /*
     * Convenience function that inserts the CSS style, CSS style code-example, HTML code-example
     * and the HTML for the final rendered result, using the elements identified by the given
     * templatePrefixId. The strings "Css" and "Html" will be appended to the given templatePrefixId
     * to identify the template blocks containing the CSS and HTML code to be used by the example.
     *
     * @param htmlTemplateId - ID of the element containing the HTML code to insert.
     */
    insertHtmlExample: function(htmlTemplateId) {
      this.insertCodeExampleWithHeadingFromTemplate(htmlTemplateId, 'HTML', '*ml');
      this.insertRenderedResultWithHeadingFromTemplate(htmlTemplateId, 'Rendered Result');
    },

    /*
     * Convenience function that inserts a list item for the style property identified by stylePropertyName
     * and element identified by elementId.
     *
     * @param elementId - ID of the element with the desired style property.
     * @param stylePropertyName - name of the style property to render.
     */
    insertStylePropertyValueListItem: function(elementId, stylePropertyName) {
      domHelper.insertElement("li", "Element '" + elementId + "' is: " + domHelperModule.getStylePropertyValue(elementId, stylePropertyName));
    },

    /*
     * Custom "tag" handler to render the CSS styles for a series of given elements.
     *
     * Example:
     *   <div styleDisplayPanel='{"elementPropertyList":[{"fixedEx1": "position"}, {"fixInnerEx1": "position"}], "useShortItems": "true"}'></div>
     */
    insertStyleDisplayPropertyList: function() {
      // there can be many 'Style Display' sections per page.
      var stylePanels = document.querySelectorAll("[" + 'styleDisplayPanel' + "]");

      for (var panelIndex=0; panelIndex<stylePanels.length; panelIndex++) {
        var generatedHtml = "<ul style='margin-top:0px;'>";
        var stylePanelElement = stylePanels[panelIndex];
        var styleDisplayPanelAttribute = stylePanelElement.getAttribute("styleDisplayPanel");

        if (styleDisplayPanelAttribute == null) {
          generatedHtml += "<li>ERROR: Missing params. Attribute requires minimum JSON value (styleDisplayPanel='{}').</li>";
        } else {
          var args = JSON.parse(styleDisplayPanelAttribute);
          var elementPropertyList = domHelper.coalesce(args.elementPropertyList, null);
          if (elementPropertyList == null) {
            generatedHtml += "<li>ERROR: Missing elementPropertyList parameter (\"elementPropertyList\": [{\"id\": \"property\"}]).</li>";
          } else {
            var useShortItems = domHelper.coalesce(args.useShortItems, 'true');
            for (var propertyIndex=0; propertyIndex<elementPropertyList.length; propertyIndex++) {
              var idPropertyPair = elementPropertyList[propertyIndex];
              for (var elementId in idPropertyPair) {
                if (useShortItems == 'true') {
                  generatedHtml += "<li>Element '" + elementId + "' is: " + domHelperModule.getStylePropertyValue(elementId, idPropertyPair[elementId]) + "</li>";
                } else {
                  generatedHtml += "<li>The '" + idPropertyPair[elementId] + "' property of element '" + elementId + "' is: " + domHelperModule.getStylePropertyValue(elementId, idPropertyPair[elementId]) + "</li>";
                }
              }
            }
          }
        }
        generatedHtml += "</ul>";
        stylePanelElement.innerHTML = generatedHtml;
      }
    }
  };

}(domHelperModule));
