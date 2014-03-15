/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzAboutPage> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

//document.createElement("tzAboutPage");

/*
 * The <tzAboutPage> tag renders a common introduction, displayed across all of the
 * ThruZero Lab projects and pages. There can be only one Introduction section per page.
 *
 * Example:
 *
 *   <tzAboutPage style="margin-top:12px;"/>
 */
var tzAboutPageTag = (function(tzDomHelper) {
  "use strict";

  return {
    /**
     * Render the first <tzAboutPage> tag on the page - only one tag is supported.
     */
    renderAll: function() {
      // there can be only one 'About Application' per page.
      var tagNode = tzDomHelper.getFirstElementByTagName('tzAboutPage');

      this.renderTag(tagNode);
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

      // for now, just hard-code the content
      var adjacentHtml = "";
      adjacentHtml += "This page contains example code used for the ";
      adjacentHtml += "<a href='http://www.thruzero.com/jcat3/apps/resources/resources.jsf?rid=css.overview'>CSS Summary</a> ";
      adjacentHtml += "at <a href='http://www.thruzero.com/'>ThruZero</a>. ";
      adjacentHtml += "The example code (e.g., CSS and HTML) is defined with inline-templates and then rendered live, so it will always match the rendered example. ";

      // insert content into the tag body
      containerNode.insertAdjacentHTML("afterbegin", adjacentHtml);
    }
  }
}(tzDomHelperModule));
