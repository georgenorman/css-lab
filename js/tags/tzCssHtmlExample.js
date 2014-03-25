/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzCssHtmlExample> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

//document.createElement("tzCssHtmlExample");

/*
 * The <tzCssHtmlExample> tag renders the CSS style, CSS style code-example, HTML code-example
 * and then the live HTML, for the result, using the code templates identified by the
 * cssTemplateId and htmlTemplateId attributes.
 *
 * The tag attributes are read from the tzCssHtmlExample element, as shown in the examples below:
 *
 *   <tzCssHtmlExample cssTemplateId="basicBoxModelCss" htmlTemplateId="basicBoxModelHtml"></tzCssHtmlExample>
 *   <tzCssHtmlExample htmlTemplateId="tmplExampleRelInStaticNoMarginHtml"></tzCssHtmlExample>
 *
 * @attribute cssTemplateId - ID of the element containing the CSS code to insert.
 * @attribute htmlTemplateId - ID of the element containing the HTML code to insert.
 *
 * Example:
 */
var tzCssHtmlExampleTag = (function(tzDomHelper, tzCustomTagHelper, tzCssBlock, tzHtmlBlock, tzCodeExample) {
  "use strict";

  return {
    getTagName: function() {
      return "tzCssHtmlExample";
    },

    /**
     * Render all <tzCssHtmlExample> tags on the page.
     */
    renderAll: function() {
      // find all tags
      var tagNodeList = document.getElementsByTagName("tzCssHtmlExample");

      // render each tag
      for (var i = 0; i < tagNodeList.length; i++) {
        var tagNode = tagNodeList[i];

        this.renderTag(tagNode);
      }
    },

    /**
     * Render the <tzCssHtmlExample> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      var tagNode = tzDomHelper.getFirstElementByTagName(tagId);

      this.renderTag(tagNode);
    },

    /**
     * Render the given tzHtmlCssExampleTagNode.
     *
     * @param tzHtmlCssExampleTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzHtmlCssExampleTagNode) {
      // get the attributes
      var cssComment;
      var cssTemplateId;
      var htmlTemplateId;
      if (tzDomHelper.isNotEmpty(tzHtmlCssExampleTagNode.getAttribute("templateId"))) {
        cssTemplateId = tzHtmlCssExampleTagNode.getAttribute("templateId") + "Css";
        htmlTemplateId = tzHtmlCssExampleTagNode.getAttribute("templateId") + "Html";
      } else {
        cssTemplateId = tzHtmlCssExampleTagNode.getAttribute("cssTemplateId");
        htmlTemplateId = tzHtmlCssExampleTagNode.getAttribute("htmlTemplateId");
      }

      var rawCss = null;
      if (tzDomHelper.isNotEmpty(cssTemplateId)) {
        rawCss = tzDomHelper.getInnerHtmlWithDefault(cssTemplateId);
        cssComment = tzDomHelper.getFirstChildElementInnerHtmlByTagName(tzHtmlCssExampleTagNode, "tzCssComment");
      }

      var rawHtml = tzDomHelper.getInnerHtmlWithDefault(htmlTemplateId);
      var htmlComment = tzDomHelper.getFirstChildElementInnerHtmlByTagName(tzHtmlCssExampleTagNode, "tzHtmlComment");
      var resultComment = tzDomHelper.getFirstChildElementInnerHtmlByTagName(tzHtmlCssExampleTagNode, "tzResultComment");

      // remove child nodes (e.g., optional comment nodes)
      tzDomHelper.removeAllChildNodes(tzHtmlCssExampleTagNode);

      // render the result
      this.render(tzHtmlCssExampleTagNode, cssComment, rawCss, htmlComment, resultComment, rawHtml);
    },

    /**
     * Render the code examples and live code block, into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param cssComment optional comment to render above the CSS code block.
     * @param rawCss the CSS code to insert.
     * @param htmlComment optional comment to render above the HTML code block.
     * @param resultComment optional comment to render above the live result.
     * @param rawHtml the HTML code to insert.
     */
    render: function(containerNode, cssComment, rawCss, htmlComment, resultComment, rawHtml) {
      // render the live CSS, if present
      if (tzDomHelper.isNotEmpty(rawCss)) {
        tzCssBlock.render(containerNode, rawCss);

        // render the CSS code example
        tzCodeExample.render(containerNode, "CSS", cssComment, "css", rawCss);
      }

      // render the HTML code example
      tzCodeExample.render(containerNode, "HTML", htmlComment, "*ml", rawHtml);

      // render the live result
      tzHtmlBlock.render(containerNode, "Rendered Result", resultComment, rawHtml);
    }

  }

}(tzDomHelperModule, tzCustomTagHelperModule, tzCssBlockTag, tzHtmlBlockTag, tzCodeExampleTag));
