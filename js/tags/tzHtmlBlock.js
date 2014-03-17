/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzHtmlBlock> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

/*
 * The <tzHtmlBlock> tag renders a heading, followed by a <code> block with the XML escaped text from the element of the given templateId.
 *
 * The tag attributes are read from the tzCodeExample element, as shown in the example below:
 *
 *    <tzHtmlBlock templateId="basicBoxModelHtml" heading="Rendered Result"></tzHtmlBlock>
 *
 * @attribute templateId - ID of the element containing the raw HTML code to render.
 * @attribute heading - heading text [optional]
 */
var tzHtmlBlockTag = (function(tzDomHelper) {
  "use strict";

  return {
    /**
     * Render all tags.
     */
    renderAll: function() {
      // find all tags
      var tagNodeList = document.getElementsByTagName("tzHtmlBlock");

      // render each tag
      for (var i = 0; i < tagNodeList.length; i++) {
        var tagNode = tagNodeList[i];

        this.renderTag(tagNode);
      }
    },

    /**
     * Render the tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      var tagNode = tzDomHelper.getFirstElementByTagName(tagId);

      this.renderTag(tagNode);
    },

    /**
     * Render the given tzHtmlTagNode.
     *
     * @param tzHtmlTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzHtmlTagNode) {
      // get the attributes
      var heading = tzHtmlTagNode.getAttribute("heading");
      var templateId = tzHtmlTagNode.getAttribute("templateId");
      var resultComment = tzDomHelper.getFirstChildElementInnerHtmlByTagName(tzHtmlTagNode, "tzResultComment");
      var rawHtml = tzDomHelper.getInnerHtml(templateId);

      // render the result
      this.render(tzHtmlTagNode, heading, resultComment, rawHtml);
    },

    /**
     * Render the HTML code block into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param heading optional heading to display for the live code block.
     * @param resultComment optional comment to render above the live result.
     * @param rawHtml the code that will be rendered into the given containerNode.
     */
    render: function(containerNode, heading, resultComment, rawHtml) {
      // render optional heading, if present
      if (tzDomHelper.isNotEmpty(heading)) {
        var headingElement = document.createElement("h4");
        headingElement.insertAdjacentHTML("afterbegin", heading);
        containerNode.appendChild(headingElement);
      }

      // render optional result comment, if present
      if (tzDomHelper.isNotEmpty(resultComment)) {
        var commentElement = document.createElement("p");
        commentElement.className += " tz-html-block-comment";
        commentElement.insertAdjacentHTML("afterbegin", resultComment);
        containerNode.appendChild(commentElement);
      }

      // render raw HTML from the template
      var divElement = document.createElement("div");

      divElement.className += " tz-html-block";
      divElement.insertAdjacentHTML("afterbegin", rawHtml);
      containerNode.appendChild(divElement);
    }
  }
}(tzDomHelperModule));
