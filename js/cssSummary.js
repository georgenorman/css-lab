/*!
  ~ Copyright (c) 2014 George Norman.
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ --------------------------------------------------------------
  ~ Simple support functions for CSS Summary.
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
      var styleHtml = domHelper.getInnerHtml(templateId);

      domHelper.insertElement("style", styleHtml);
    },

    /*
     * Insert a heading, followed by a <code> block with the text from the element of the given templateId.
     *
     * @param templateId - ID of the element containing the HTML or JavaScript code to insert.
     * @param heading - <h4> heading for the div block.
     */
    insertCodeExampleWithHeadingFromTemplate: function(templateId, heading) {
      domHelper.insertElement("h4", heading);

      this.insertCodeExampleFromTemplate(templateId);
    },

    /*
     * Insert a <code> block, with the HTML-escaped text from the element with the given templateId.
     *
     * @param templateId - ID of the element containing the HTML or JavaScript code to insert.
     */
    insertCodeExampleFromTemplate: function(templateId) {
      var codeExample = domHelper.getInnerHtml(templateId);

      // XML escape the code example.
      codeExample = codeExample.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      domHelper.insertElement("code", codeExample);
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
      this.insertCodeExampleWithHeadingFromTemplate(cssTemplateId, 'CSS');
      this.insertCodeExampleWithHeadingFromTemplate(htmlTemplateId, 'HTML');
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
      this.insertCodeExampleWithHeadingFromTemplate(htmlTemplateId, 'HTML');
      this.insertRenderedResultWithHeadingFromTemplate(htmlTemplateId, 'Rendered Result');
    },

    /*
     * Insert a simple, single-level, Table of Contents, inside the element selected by the given tocClassName.
     * A default title of "Table of Contents" will be used if an optionalTitle is not provided.
     * The title is rendered as an h2 element.
     *
     * @param contentHeaderItemTagName - tag name of the headers, in the main content, that will be included in the Table of Contents.
     * @param optionalTitle - An optional title can be provided, if the default "Table of Contents" needs to be changed.
     */
    insertTableOfContents: function() {
      var tocElement = domHelper.getFirstElementByAttributeName("tableOfContents");
      var args = JSON.parse(tocElement.getAttribute("tableOfContents"));

      // add heading
      var title = this.ensureValue(args.optionalTitle, "Table of Contents");
      var heading = document.createElement("h2");
      heading.innerHTML = "<b>" + title + "</b>";
      tocElement.appendChild(heading);

      // add contents
      var ul = document.createElement("ul");
      ul.className = args.tocClass;
      var h2Elements = document.getElementsByTagName(args.contentHeaderItemTagName);
      for (var i = 0; i < h2Elements.length; i++) {
        var li = document.createElement("li");
        var tocItem = h2Elements[i];

        if (tocItem !== heading) {
          var tocItemText = h2Elements[i].innerText;

          tocItemText = this.ensureValue(tocItemText, tocItem.id);
          li.innerHTML = "<a href=\"#" + tocItem.id + "\">" + tocItemText + "</a>";
          ul.appendChild(li);
        }
      }
      tocElement.appendChild(ul);
    },

    /*
     * Common introduction/header displayed across all of the CSS Summary pages.
     */
    aboutPagePanel: function() {
      var infoPanelElement = domHelper.getFirstElementByAttributeName('aboutPagePanel');

      infoPanelElement.innerHTML += "This page contains the code examples used for the ";
      infoPanelElement.innerHTML += "<a href='http://www.thruzero.com/jcat3/apps/resources/resources.jsf?rid=css.overview'>CSS Summary</a> ";
      infoPanelElement.innerHTML += "at <a href='http://www.thruzero.com/'>ThruZero</a>. ";
      infoPanelElement.innerHTML += "The CSS and HTML code is defined in templates and then rendered live, to immediately expose typos. ";
    },

    /*
     * Perform the following tasks after all CSS, JS and HTML has loaded:
     *   - Insert the default Table of Contents.
     */
    performDefaultOnLoad: function() {
      this.aboutPagePanel();
      this.insertTableOfContents();
    },

    /*
     * Return the given value, if it's defined; otherwise, return the given default value.
     *
     * @param attributeName - name of attribute of targeted element.
     */
    ensureValue: function(value, defaultValue) {
      var result = (value === undefined || value === "") ? defaultValue : value;

      return result;
    }
  };

}(domHelperModule)); // TODO-p1(Geo): jshint says this isn't defined. However, it is defined in the application just before importing this file.
