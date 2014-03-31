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
var tzHtmlBlockTag = (function(tzDomHelper, tzCustomTagHelper) {
  "use strict";

  return {
    getTagName: function() {
      return "tzHtmlBlock";
    },

    /**
     * Render all <tzHtmlBlock> tags on the page.
     */
    renderAll: function() {
      tzCustomTagHelper.renderAll(this);
    },

    /**
     * Render the <tzHtmlBlock> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      tzCustomTagHelper.renderTagById(this, tagId);
    },

    /**
     * Render the given tzHtmlTagNode.
     *
     * @param tzHtmlTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzHtmlTagNode) {
      var templateId = tzHtmlTagNode.getAttribute("templateId");

      // get the attributes
      var context = {
        "heading": tzHtmlTagNode.getAttribute("heading"),
        "resultComment": tzDomHelper.getFirstChildElementInnerHtmlByTagName(tzHtmlTagNode, "tzResultComment"),
        "rawHtml": tzDomHelper.getInnerHtml(templateId)
      };

      // render the result
      this.render(tzHtmlTagNode, context);
    },

    /**
     * Render the HTML code block into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param context object containing the values needed to render the result:
     *            - heading optional heading to display for the live code block.
     *            - resultComment optional comment to render above the live result.
     *            - rawHtml the code that will be rendered into the given containerNode.
     */
    render: function(containerNode, context) {
      // render optional heading, if present
      if (tzDomHelper.isNotEmpty(context.heading)) {
        var headingElement = document.createElement("h4");
        headingElement.insertAdjacentHTML("afterbegin", context.heading);
        containerNode.appendChild(headingElement);
      }

      // render optional result comment, if present
      if (tzDomHelper.isNotEmpty(context.resultComment)) {
        var commentElement = document.createElement("p");
        commentElement.className += " tz-html-block-comment";
        commentElement.insertAdjacentHTML("afterbegin", context.resultComment);
        containerNode.appendChild(commentElement);
      }

      // render raw HTML from the template
      var divElement = document.createElement("div");
      divElement.className += " tz-html-block";
      divElement.insertAdjacentHTML("afterbegin", context.rawHtml);
      containerNode.appendChild(divElement);
    }
  }
}(tzDomHelperModule, tzCustomTagHelperModule));
