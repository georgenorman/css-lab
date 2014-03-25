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
      // find all tags
      var tagNodeList = document.getElementsByTagName("tzCodeExample");

      // render each tag
      for (var i=0; i<tagNodeList.length; i++) {
        var tagNode = tagNodeList[i];

        this.renderTag(tagNode);
      }
    },

    /**
     * Render the <tzCodeExample> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      var tagNode = tzDomHelper.getFirstElementByTagName(tagId);

      this.renderTag(tagNode);
    },

    /**
     * Render the given tzCodeExampleTagNode.
     *
     * @param tzCodeExampleTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzCodeExampleTagNode) {
      // get the attributes
      var templateId = tzCodeExampleTagNode.getAttribute("templateId");
      var heading = tzCodeExampleTagNode.getAttribute("heading");
      var codeBlockComment = tzDomHelper.getFirstChildElementInnerHtmlByTagName(tzCodeExampleTagNode, "tzCodeBlockComment");
      var lang = tzCodeExampleTagNode.getAttribute("lang");
      var rawHtml = tzDomHelper.getInnerHtmlWithDefault(templateId);

      // remove child nodes (e.g., optional codeBlockComment node)
      tzDomHelper.removeAllChildNodes(tzCodeExampleTagNode);

      // render the result
      this.render(tzCodeExampleTagNode, heading, codeBlockComment, lang, rawHtml);
    },

    /**
     * Render the code example into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param heading optional heading to use.
     * @param codeBlockComment optional comment to render above the code block.
     * @param lang language ID for the code syntax highlighter (e.g., "css", "*ml").
     * @param rawHtml the code that will be XML escaped and rendered into the given containerNode.
     */
    render: function(containerNode, heading, codeBlockComment, lang, rawHtml) {
      // render optional heading, if present
      if (tzDomHelper.isNotEmpty(heading)) {
        var headingElement = document.createElement("h4");
        headingElement.insertAdjacentHTML("afterbegin", heading);
        containerNode.appendChild(headingElement);
      }

      // render optional HTML comment, if present
      if (tzDomHelper.isNotEmpty(codeBlockComment)) {
        var commentElement = document.createElement("p");
        commentElement.className += " tz-code-example-comment";
        commentElement.insertAdjacentHTML("afterbegin", codeBlockComment);
        containerNode.appendChild(commentElement);
      }

      var olElement = document.createElement("ol");

      // create a list item for each line (to display line numbers).
      var codeLines = rawHtml.split("\n");
      for (var i=0; i<codeLines.length; i++) {
        var escapedCodeLine = tzDomHelper.xmlEscape(codeLines[i]);
        // @-@:p0 Highlighter should be applied to the complete inner HTML, and not line-by-line as done here, but
        //        the closing list-item (</li>) breaks the span with the style, so keeping it simple and broken, for now.
        var liElement = document.createElement("li");
        liElement.insertAdjacentHTML("afterbegin", " " + tzCodeHighlighter.highlight(escapedCodeLine, lang));
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
