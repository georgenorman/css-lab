/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Renders <tzDisplayStyles> tags - sharable among all projects.
 ~ --------------------------------------------------------------
 ~
 */

/*
 * The <tzDisplayStyles> tag renders one or more styles from one or more elements.
 *
 * The tag attributes are read from the tzDisplayStyles element, as shown in the example below:
 *
 *    <tzDisplayStyles items='{"idStylePairs":[{"outerMost": "position"}, {"middleGrid": "position"}, {"innerMost": "position"}]}' useShortItems="true"></tzDisplayStyles>
 *
 * @attribute items - list of element-id/css-property-name pairs used to render the result. The element-id is used to lookup an
 *            element and the css-property-name is used to read and display its property value.
 * @attribute useShortItems - if true, then displays a list of property/value pairs (without the element name); otherwise, displays the same list,
 *            but includes the element-name for each item in the list.
 */
var tzDisplayStylesTag = (function(tzDomHelper) {

  return {
    /**
     * Render all tags on the page.
     */
    renderAll: function() {
      // find all tags
      var tagNodeList = document.getElementsByTagName("tzDisplayStyles");

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
     * Render the given displayStylesTagNode.
     *
     * @param displayStylesTagNode the node to retrieve the attributes from and then render the result to.
     */
    renderTag: function(displayStylesTagNode) {
      // get the attributes
      var itemsAsString = displayStylesTagNode.getAttribute("items");
      var items = JSON.parse(itemsAsString);
      var elementPropertyList = items.idStylePairs;

      var useShortItems = displayStylesTagNode.getAttribute("useShortItems");

      // render the result
      this.render(displayStylesTagNode, elementPropertyList, useShortItems);
    },

    /**
     * Render into the given containerNode, the style property names and values, for the elements in the given elementPropertyList.
     *
     * @param containerNode where to render the result.
     * @param elementPropertyList list of element-id/css-property-name pairs used to render the result. The element-id is used to lookup an
     *        element and the css-property-name is used to read and display its property value.
     * @param useShortItems if true, then displays a list of property/value pairs (without the element name); otherwise, displays the same list,
     *        but includes the element-name for each item in the list.
     */
    render: function(containerNode, elementPropertyList, useShortItems) {
      var ul = document.createElement("ul");
      var li;

      ul.style.marginTop = "0";

      if (tzDomHelper.isEmpty(elementPropertyList)) {
        li = document.createElement("li");
        li.insertAdjacentHTML("afterbegin", "ERROR: Missing or empty elementPropertyList attribute (elementPropertyList=\"[{\"id\": \"property\"}]\"");
      } else {
        useShortItems = tzDomHelper.coalesce(useShortItems, 'true');

        for (var propertyIndex=0; propertyIndex<elementPropertyList.length; propertyIndex++) {
          li = document.createElement("li");
          var generatedHtml;
          var idPropertyPair = elementPropertyList[propertyIndex];

          for (var elementId in idPropertyPair) {
            if (useShortItems == 'true') {
              generatedHtml = "Element '" + elementId + "' is: " + tzDomHelper.getStylePropertyValue(elementId, idPropertyPair[elementId]);
            } else {
              generatedHtml = "The '" + idPropertyPair[elementId] + "' property of element '" + elementId + "' is: " + tzDomHelper.getStylePropertyValue(elementId, idPropertyPair[elementId]);
            }
          }
          li.insertAdjacentHTML("afterbegin", generatedHtml);
          ul.appendChild(li);
        }
      }

      containerNode.appendChild(ul);
    }
  }

}(tzDomHelperModule));
