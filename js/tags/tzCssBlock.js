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
var tzCssBlockTag = (function(tzDomHelper) {
  "use strict";

  return {
    /**
     * Render all tags on the page.
     */
    renderAll: function() {
      // find all tags
      var tagNodeList = document.getElementsByTagName("tzCssBlock");

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
     * Render the given tzStyleTagNode.
     *
     * @param tzStyleTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzStyleTagNode) {
      // get the attributes
      var templateId = tzStyleTagNode.getAttribute("templateId");
      var styleData = tzDomHelper.getInnerHtml(templateId);

      // render the result
      this.render(tzStyleTagNode, styleData);
    },

    /**
     * Render the <style> block into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param styleData the raw styles to render into the given containerNode.
     */
    render: function(containerNode, styleData) {
      var styleElement = document.createElement("style");
      styleElement.insertAdjacentHTML("afterbegin", styleData);
      containerNode.appendChild(styleElement);
    }
  }

}(tzDomHelperModule));
