/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzAboutPage> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

//document.createElement("cssLabAbout");

/*
 * The <cssLabAbout> tag renders a common introduction, displayed across all of the
 * ThruZero CSS Lab projects and pages. There can be only one Introduction section per page.
 *
 * Example:
 *
 *   <cssLabAbout style="margin-top:12px;"/>
 */
var cssLabAboutTag = (function(tzDomHelper, tzCustomTagHelper) {
  "use strict";

  // http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
  var template =
      ['This page contains example code used for the <a href="http://www.thruzero.com/jcat3/apps/resources/resources.jsf?rid=css.overview">CSS Summary</a>',
        'at <a href="http://www.thruzero.com/">ThruZero</a>. ',
        'The example code (e.g., CSS and HTML) is defined with inline-templates and then rendered live, so it will always match the rendered example. '
      ].join('\n');

  return {
    getTagName: function() {
      return "cssLabAbout";
    },

    /**
     * Render the first <cssLabAbout> tag on the page - only one tag per page is supported.
     */
    renderAll: function() {
      // there can be only one 'About Application' per page.
       tzCustomTagHelper.renderFirst(this);
    },

    /**
     * Render the <cssLabAbout> tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function(tagId) {
      tzCustomTagHelper.renderTagById(this, tagId);
    },

    /**
     * Render the given aboutTagNode.
     *
     * @param aboutTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(aboutTagNode) {
      // render the result
      this.render(aboutTagNode);
    },

    /**
     * Render the 'About Application' HTML, into the given containerNode.
     *
     * @param containerNode where to render the result.
     */
    render: function(containerNode) {
      // set the display style to block
      containerNode.style.display = 'block';

      //var template = tzCustomTagHelper.getTemplate(this.getTagName() + "Template"); // @-@:p1(geo) Experimental

      tzCustomTagHelper.renderTagFromTemplate(containerNode, template, {});
    }
  }
}(tzDomHelperModule, tzCustomTagHelperModule));
