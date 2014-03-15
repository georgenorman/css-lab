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
var tzCssHtmlExampleTag = (function(tzDomHelper, tzCssBlock, tzHtmlBlock, tzCodeExample) {
  "use strict";

  return {
    /**
     * Render all tags.
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
     * Render the tag identified by the given tagId.
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
      var styleData = null;
      var cssTemplateId = tzHtmlCssExampleTagNode.getAttribute("cssTemplateId");

      if (tzDomHelper.isNotEmpty(cssTemplateId)) {
        styleData = tzDomHelper.getInnerHtml(cssTemplateId);
      }

      var htmlTemplateId = tzHtmlCssExampleTagNode.getAttribute("htmlTemplateId");
      var rawHtml = tzDomHelper.getInnerHtml(htmlTemplateId);

      // render the result
      this.render(tzHtmlCssExampleTagNode, styleData, rawHtml);
    },

    /**
     * Render the code examples and live code block, into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param styleData the CSS code to insert.
     * @param rawHtml the HTML code to insert.
     */
    render: function(containerNode, styleData, rawHtml) {
      // render the live CSS, if present
      if (tzDomHelper.isNotEmpty(styleData)) {
        tzCssBlock.render(containerNode, styleData);

        // render the CSS code example
        tzCodeExample.render(containerNode, "CSS", "css", styleData);
      }

      // render the HTML code example
      tzCodeExample.render(containerNode, "HTML", "*ml", rawHtml);

      // render the live result
      tzHtmlBlock.render(containerNode, "Rendered Result", rawHtml);
    }

  }

}(tzDomHelperModule, tzCssBlockTag, tzHtmlBlockTag, tzCodeExampleTag));
