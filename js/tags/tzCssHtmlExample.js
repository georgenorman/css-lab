/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzCssHtmlExample> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

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
 * @attribute templateId - optional; use this instead of cssTemplateId and htmlTemplateId to simplify the code.
 *     "Css" and "Html" will be appended to the given templateId, to form the IDs to the CSS and HTML templates.
 *
 * Example:
 *
 * <script type="multiline-template" id="simpleTemplateCss">
 *   .foo {color: red;}
 * </script>
 *
 * <script type="multiline-template" id="simpleTemplateHtml">
 *   <span class="foo">This is red</span>
 * </script>
 *
 * <tzCssHtmlExample templateId="simpleTemplate" width="750px">
 *   <cssComment>A comment rendered beneath the CSS header.</cssComment>
 *   <htmlComment>A comment rendered beneath the HTML header.</htmlComment>
 *   <resultComment>A comment rendered beneath the Result header.</resultComment>
 * </tzCssHtmlExample>
 *
 */
var tzCssHtmlExampleTag = (function(tzDomHelper, tzCustomTagHelper, tzCssBlock, tzHtmlBlock, tzCodeExample) {
  "use strict";

  var cssCommentExpression = new RegExp("<cssComment>(.+?)<\/cssComment>", "ig");
  var htmlCommentExpression = new RegExp("<htmlComment>(.+?)<\/htmlComment>", "ig");
  var resultCommentExpression = new RegExp("<resultComment>(.+?)<\/resultComment>", "ig");

  return {
    getTagName: function() {
      return "tzCssHtmlExample";
    },

    /**
     * Render all <tzCssHtmlExample> tags on the page.
     */
    renderAll: function() {
      tzCustomTagHelper.renderAll(this);
    },

    /**
     * Render the <tzCssHtmlExample> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      tzCustomTagHelper.renderTagById(this, tagId);
    },

    /**
     * Render the given tzHtmlCssExampleTagNode.
     *
     * @param tzHtmlCssExampleTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzHtmlCssExampleTagNode) {
      // get the template IDs from the tag
      var cssTemplateId;
      var htmlTemplateId;
      if (tzDomHelper.isNotEmpty(tzHtmlCssExampleTagNode.getAttribute("templateId"))) {
        cssTemplateId = tzHtmlCssExampleTagNode.getAttribute("templateId") + "Css";
        htmlTemplateId = tzHtmlCssExampleTagNode.getAttribute("templateId") + "Html";
      } else {
        cssTemplateId = tzHtmlCssExampleTagNode.getAttribute("cssTemplateId");
        htmlTemplateId = tzHtmlCssExampleTagNode.getAttribute("htmlTemplateId");
      }

      // get css info from the tag
      var cssError = "";
      var cssComment = "";
      var rawCss = "";
      if (tzDomHelper.isNotEmpty(cssTemplateId)) {
        cssComment = tzCustomTagHelper.getFirstMatchedGroup(tzHtmlCssExampleTagNode, cssCommentExpression);
        rawCss = tzDomHelper.getInnerHtml(cssTemplateId);

        if (tzDomHelper.isEmpty(rawCss)) {
          cssError = "CSS Template was not found for given ID: " + cssTemplateId;
        }
      }

      // build the context
      var context = {
        "cssComment": cssComment,
        "rawCss": rawCss,
        "htmlComment": tzCustomTagHelper.getFirstMatchedGroup(tzHtmlCssExampleTagNode, htmlCommentExpression),
        "rawHtml": tzDomHelper.getInnerHtml(htmlTemplateId),
        "resultComment": tzCustomTagHelper.getFirstMatchedGroup(tzHtmlCssExampleTagNode, resultCommentExpression),
        "width": tzHtmlCssExampleTagNode.getAttribute("width"),
        "height": tzHtmlCssExampleTagNode.getAttribute("height")
      };

      // remove child nodes (e.g., optional comment nodes)
      tzDomHelper.removeAllChildNodes(tzHtmlCssExampleTagNode);

      // check for error
      if (tzDomHelper.isNotEmpty(cssError)) {
        tzDomHelper.createElementWithAdjacentHtml(tzHtmlCssExampleTagNode, "p", '{"style.color":"red"}', cssError);
      }

      // render the result (without CSS if error was encountered)
      this.render(tzHtmlCssExampleTagNode, context);
    },

    /**
     * Render the code examples and live code block, into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param context object containing the values needed to render the result:
     *            - cssComment optional comment to render above the CSS code block.
     *            - rawCss the CSS code to insert.
     *            - htmlComment optional comment to render above the HTML code block.
     *            - rawHtml the HTML code to insert.
     *            - resultComment optional comment to render above the live result.
     *            - width optional width (hack) to force the zebra stripes to fill the entire code area when scrolling is required.
     *            - height optional height.
     */
    render: function(containerNode, context) {
      // render the live CSS, if present
      if (tzDomHelper.isNotEmpty(context.rawCss)) {
        tzCssBlock.render(containerNode, context);

        // render the CSS code example
        tzCodeExample.render(containerNode, {
          "heading": "CSS",
          "codeBlockComment": context.cssComment,
          "lang": "css",
          "width": context.width,
          "rawCode": context.rawCss});
      }

      // render the HTML code example
      tzCodeExample.render(containerNode, {
        "heading": "HTML",
        "codeBlockComment": context.htmlComment,
        "lang": "*ml",
        "width": context.width,
        "rawCode": context.rawHtml});

      // render the live HTML code
      tzHtmlBlock.render(containerNode, {
        "heading": "Rendered Result",
        "resultComment": context.resultComment,
        "height": context.height,
        "rawHtml": context.rawHtml});
    }

  }

}(tzDomHelperModule, tzCustomTagHelperModule, tzCssBlockTag, tzHtmlBlockTag, tzCodeExampleTag));
