/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzBulletPoint> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

/*
 * The <tzBulletPoint> tag behaves like a single list item - it renders a status icon on the left followed by an HTML block on the right.
 *
 * The tag attributes are read from the tzBulletPoint element, as shown in the example below:
 *
 *    <tzBulletPoint iconClass="success" widthLeft="25px">This experiment successfully shows that...</tzBulletPoint>
 *
 * @attribute iconClass class name used to style the <i> element used as a placeholder for the icon.
 *      The following icons are predefined: "tz-bullet-point-pass", "tz-bullet-point-fail" (see css/tzBulletPoint.css).
 * @attribute leftColumnWidth optional width of the left column.
 * @attribute style optional style for the wrapper div.
 */
var tzBulletPointTag = (function(tzDomHelper, tzCustomTagHelper) {
  "use strict";

  var template =
      ['<div class="group" {{context.styleAttribute}}>',
       '  <div><i class="{{context.iconClass}}"></i></div>',
       '  <div style="margin-left:{{context.leftColumnWidth}};">{{context.rawRightColumnHtml}}</div>',
       '</div>'
      ].join('\n');

  return {
    getTagName: function() {
      return "tzBulletPoint";
    },

    /**
     * Render all <tzBulletPoint> tags on the page.
     */
    renderAll: function() {
      tzCustomTagHelper.renderAll(this);
    },

    /**
     * Render the <tzBulletPoint> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      tzCustomTagHelper.renderTagById(this, tagId);
    },

    /**
     * Render the given tzBulletPointTagNode.
     *
     * @param tzBulletPointTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(tzBulletPointTagNode) {
      // build the context
      var style = tzBulletPointTagNode.getAttribute("style");
      var context = {
        "iconClass": tzBulletPointTagNode.getAttribute("iconClass"), // class name
        "styleAttribute": tzDomHelper.isEmpty(style) ? "" : "style='" + style + "'", // complete style attribute
        "leftColumnWidth": tzDomHelper.coalesce(tzBulletPointTagNode.getAttribute("leftColumnWidth"), "24px"),
        "rawRightColumnHtml": tzBulletPointTagNode.innerHTML
      };

      // remove child nodes (e.g., rawRightColumnHtml retrieved for use by the right column)
      tzDomHelper.removeAllChildNodes(tzBulletPointTagNode);

      // render the result
      this.render(tzBulletPointTagNode, context);
    },

    /**
     * Render the <tzBulletPoint> tag into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param context object containing the values needed to render the result:
     *            - iconClass css used to render an icon in the left column.
     *            - leftColumnWidth width of the left column.
     *            - rawRightColumnHtml the raw HTML to render into the right column.
     */
    render: function(containerNode, context) {
      //var template = tzCustomTagHelper.getTemplate(this.getTagName() + "Template"); // @-@:p1(geo) Experimental

      tzCustomTagHelper.renderTagFromTemplate(containerNode, template, context);
    }
  };

}(tzDomHelperModule, tzCustomTagHelperModule));
