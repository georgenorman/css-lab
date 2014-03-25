/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzTableOfContents> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 */

//document.createElement("tzTableOfContents");

/**
 * The &lt;tzTableOfContents&gt; tag auto-generates a simple two-level Table of Contents, inside the element selected by the given tocClassName.
 * A default title of "Table of Contents" will be used if the optionalTitle is not provided.
 * The title is rendered as an h2 element.
 *
 * Limitations:
 *   1. There can be only one Table of Contents section per page.
 *   2. Maximum levels is two.
 *
 * The tag attributes are read from the tzTableOfContents element, as shown in the example below:
 *
 *    &lt;tzTableOfContents class="toc" level1ItemsTagName="h2" level2ItemsTagName="h3"&gt;&lt;/tzTableOfContents&gt;
 *
 * @attribute class - the CSS class to apply to the rendered Table of Contents
 * @attribute level1ItemsTagName - tag name used to identify the level-1 headers to be included in the Table of Contents
 *        (e.g., "h2" would cause all h2 elements on the page, to be used as items in the generated Table of Contents).
 * @attribute level2ItemsTagName - tag name used to identify the level-2 headers to be included under each level-1 header
 *        (e.g., "h3" would cause all h3 elements on the page, to be used as sub-items in the generated Table of Contents).
 * @attribute optionalTitle - optional title (default is "Table of Contents").
 */
var tzTableOfContentsTag = (function(tzDomHelper, tzCustomTagHelper) {
  "use strict";

  return {
    getTagName: function() {
      return "tzTableOfContents";
    },

    /**
     * Render the 'Table of Contents' tag.
     */
    renderAll: function () {
      // there can be only one 'table of contents' per page.
      tzCustomTagHelper.renderFirst(this);
    },

    /**
     * Render the 'Table of Contents' tag identified by the given tagId.
     *
     * @param tagId ID of the tag to render.
     */
    renderTagById: function (tagId) {
      var tagNode = tzDomHelper.getFirstElementByTagName(tagId);

      this.renderTag(tagNode);
    },

    /**
     * Render the given tzHtmlTagNode.
     *
     * @param tocNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function (tocNode) {
      // get the attributes
      var cssClassName = tocNode.getAttribute("class");
      var level1ItemsTagName = tocNode.getAttribute("level1ItemsTagName");
      var level2ItemsTagName = tocNode.getAttribute("level2ItemsTagName");
      var title = tocNode.getAttribute("title");

      // render the result
      this.render(tocNode, cssClassName, level1ItemsTagName, level2ItemsTagName, title);
    },

    /**
     * Render the 'Table of Contents' into the given containerNode.
     *
     * @param containerNode where to render the result.
     * @param cssClassName css class name to use for the Table of Contents.
     * @param level1ItemsTagName tag name used to identify the level-1 headers to be included in the Table of Contents.
     * @param level2ItemsTagName tag name used to identify the level-2 headers to be included under each level-1 header.
     * @param title optional title (default is "Table of Contents").
     */
    render: function (containerNode, cssClassName, level1ItemsTagName, level2ItemsTagName, title) {
      // find all level-1 nodes
      var level1NodeList = document.getElementsByTagName(level1ItemsTagName);

      // find all level-2 nodes (if tag name is given)
      var level2NodeList = null;
      if (tzDomHelper.isNotEmpty(level2ItemsTagName)) {
        level2NodeList = document.getElementsByTagName(level2ItemsTagName);
      }

      // start ToC
      var toc = document.createElement("ul");
      toc.className = cssClassName;

      // generate list of level-1 and level-2 ToC items
      for (var i = 0; i < level1NodeList.length; i++) {
        // there will always be a level-1 item, so create and initialize
        var tocLevel1Item = createTableOfContentsItem(level1NodeList[i]);

        // level-2 items are optional
        var currentLevel2Nodes = findAllNodesWithIdsThatBeginWith(level2NodeList, level1NodeList[i].id + ".");
        if (currentLevel2Nodes.length > 0) {
          var level2ItemList = document.createElement("ul");

          for (var j = 0; j < currentLevel2Nodes.length; j++) {
            level2ItemList.appendChild(createTableOfContentsItem(currentLevel2Nodes[j]));
          }

          tocLevel1Item.appendChild(level2ItemList);
        }

        toc.appendChild(tocLevel1Item);
      }

      // add heading
      title = tzDomHelper.coalesce(title, "Table of Contents");
      var heading = document.createElement("h2");
      heading.insertAdjacentHTML("afterbegin", "<b>" + title + "</b>");
      containerNode.appendChild(heading);

      // add all items to ToC element
      containerNode.appendChild(toc);
    }
  };

  /**
   * Return the subset of given nodesToSearch, that have IDs that begin with the given searchString.
   *
   * @param nodesToSearch list of nodes to search
   * @param searchString string
   */
  function findAllNodesWithIdsThatBeginWith(nodesToSearch, searchString) {
    var result = [];

    if (nodesToSearch != null) {
      for(var i=0; i<nodesToSearch.length; i++) {
        if(nodesToSearch[i].id.indexOf(searchString) == 0) {
          result.push(nodesToSearch[i]);
        }
      }
    }

    return result;
  }

  function createTableOfContentsItem(node) {
    var result = document.createElement("li");
    var tocItemText = tzDomHelper.coalesce(node.innerHTML, node.id);

    result.insertAdjacentHTML("afterbegin", "<a href=\"#" + node.id + "\">" + tocItemText + "</a>");

    return result;
  }

}(tzDomHelperModule, tzCustomTagHelperModule));
