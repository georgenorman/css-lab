/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzCodeExample> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

/**
 * The <tzCodeExample> tag renders an optional heading, followed by a <code> block with the XML escaped text
 * extracted from the element with the specified templateId.
 *
 * The tag attributes are read from the tzCodeExample element, as shown in the examples below:
 *
 *    <tzCodeExample templateId="basicBoxModelHtml" heading="HTML" lang="*ml"></tzCodeExample>
 *    <tzCodeExample templateId="commonCss" lang="css"></tzCodeExample>
 *
 * @attribute templateId - ID of the element containing the HTML or JavaScript code to render.
 * @attribute heading - heading text [optional]
 * @attribute lang - language ID for the code syntax highlighter (e.g., "css", "*ml").
 * @attribute width - optional width (hack) to force the zebra stripes to fill the entire code area when scrolling is required.
 */
var tzCodeExampleTag = (function(tzDomHelper, tzCustomTagHelper, tzCodeHighlighter) {
  "use strict";

  return {
    getTagName: function() {
      return "tzCodeExample";
    },

    /**
     * Render all <tzCodeExample> tags on the page.
     */
    renderAll: function() {
      tzCustomTagHelper.renderAll(this);
    },

    /**
     * Render the <tzCodeExample> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      tzCustomTagHelper.renderTagById(this, tagId);
    },

    /**
     * Render the given tzCodeExampleTagNode.
     *
     * @param tzCodeExampleTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzCodeExampleTagNode) {
      var templateId = tzCodeExampleTagNode.getAttribute("templateId");

      // get the attributes
      var context = {
        "heading": tzCodeExampleTagNode.getAttribute("heading"),
        "codeBlockComment": tzDomHelper.getFirstChildElementInnerHtmlByTagName(tzCodeExampleTagNode, "tzCodeBlockComment"),
        "lang": tzCodeExampleTagNode.getAttribute("lang"),
        "width": tzCodeExampleTagNode.getAttribute("width"),
        "rawCode": tzDomHelper.getInnerHtmlWithDefault(templateId)
      };

      // remove child nodes (e.g., optional codeBlockComment node)
      tzDomHelper.removeAllChildNodes(tzCodeExampleTagNode);

      // render the result
      this.render(tzCodeExampleTagNode, context);
    },

    /**
     * Render the code example into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param context object containing the values needed to render the result:
     *            - heading optional heading to use.
     *            - codeBlockComment optional comment to render above the code block.
     *            - lang language ID for the code syntax highlighter (e.g., "css", "*ml").
     *            - width optional width (hack) to force the zebra stripes to fill the entire code area when scrolling is required.
     *            - rawCode the code that will be XML escaped and rendered into the given containerNode.
     */
    render: function(containerNode, context) {
      // render optional heading, if present
      if (tzDomHelper.isNotEmpty(context.heading)) {
        var headingElement = document.createElement("h4");
        headingElement.insertAdjacentHTML("afterbegin", context.heading);
        containerNode.appendChild(headingElement);
      }

      // render optional HTML comment, if present
      if (tzDomHelper.isNotEmpty(context.codeBlockComment)) {
        var commentElement = document.createElement("p");
        commentElement.className += " tz-code-example-comment";
        commentElement.insertAdjacentHTML("afterbegin", context.codeBlockComment);
        containerNode.appendChild(commentElement);
      }

      var olElement = document.createElement("ol");
      if (tzDomHelper.isNotEmpty(context.width)) {
        olElement.style.width = context.width;
      }

      // create a list item for each line (to display line numbers).
      var codeLines = context.rawCode.split("\n");
      for (var i = 0; i < codeLines.length; i++) {
        var escapedCodeLine = tzDomHelper.xmlEscape(codeLines[i]);
        // @-@:p0 Highlighter should be applied to the complete inner HTML, and not line-by-line as done here, but
        //        the closing list-item (</li>) breaks the span with the style, so keeping it simple and broken, for now.
        var liElement = document.createElement("li");
        liElement.insertAdjacentHTML("afterbegin", " " + tzCodeHighlighter.highlight(escapedCodeLine, context.lang));
        olElement.appendChild(liElement);
      }

      var codeElement = document.createElement("code");
      codeElement.className += " tz-code-example";
      codeElement.appendChild(olElement);

      containerNode.appendChild(codeElement);
    },

    /**
     * Refresh the tag (by removing the child elements and re-rendering the code example).
     *
     * @param tagId ID of the tag to refresh.
     */
    refreshTagById: function(tagId) {
      var tzCodeExampleTag = document.getElementById(tagId);

      // first, remove all child nodes, previously added from render (or renderAll).
      tzDomHelper.removeAllChildNodes(tzCodeExampleTag);

      // re-render the tag
      this.renderTag(tzCodeExampleTag);
    }
  }

}(tzDomHelperModule, tzCustomTagHelperModule, tzCodeHighlighterModule));
