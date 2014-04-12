/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzCssBlock> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

/*
 * The <tzCssBlock> tag renders a <style> block, with the text extracted from the element
 * with the specified templateId.
 *
 * The tag attributes are read from the tzCssBlock element, as shown in the example below:
 *
 *    <tzCssBlock templateId="basicBoxModelCss"></tzCssBlock>
 *
 * @attribute templateId - ID of the element containing the CSS code to insert.
 */
var tzCssBlockTag = (function(tzDomHelper, tzCustomTagHelper) {
  "use strict";

  return {
    getTagName: function() {
      return "tzCssBlock";
    },

    /**
     * Render all <tzCssBlock> tags on the page.
     */
    renderAll: function() {
      tzCustomTagHelper.renderAll(this);
    },

    /**
     * Render the <tzCssBlock> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      tzCustomTagHelper.renderTagById(this, tagId);
    },

    /**
     * Render the given tzStyleTagNode.
     *
     * @param tzStyleTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzStyleTagNode) {
      // build the context
      var context = {
        "rawCss": tzDomHelper.getInnerHtml(tzStyleTagNode.getAttribute("templateId"))
      };

      // render the result
      this.render(tzStyleTagNode, context);
    },

    /**
     * Render the <style> block into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param context object containing the values needed to render the result:
     *            - rawCss the raw styles to render into the given containerNode.
     */
    render: function(containerNode, context) {
      if (tzDomHelper.isEmpty(context.rawCss)) {
        tzDomHelper.createElementWithAdjacentHtml(containerNode, "p", '{"style.color":"red"}', "Raw CSS is missing");
      } else {
        tzDomHelper.createElementWithAdjacentHtml(containerNode, "style", null, context.rawCss);
      }
    }
  }

}(tzDomHelperModule, tzCustomTagHelperModule));
