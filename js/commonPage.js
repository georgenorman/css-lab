/*!
 ~ Copyright (c) 2014 George Norman.
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ --------------------------------------------------------------
 ~ Common page set-up functions for CSS Summary.
 ~ --------------------------------------------------------------
 ~
 */

var commonPageModule = (function(domHelper) {
  "use strict";

  return {
    /*
     * Insert a simple single-level Table of Contents, inside the element selected by the given tocClassName.
     * A default title of "Table of Contents" will be used if the optionalTitle is not provided.
     * The title is rendered as an h2 element.
     *
     * The params are read from the element with a "tableOfContents" attribute, as shown in the example below:
     *
     *    <nav tableOfContents='{"tocClass":"toc", "contentHeaderItemTagName":"h2"}'></nav>
     *
     * @param contentHeaderItemTagName - tag name used to identify the headers to be included in the Table of Contents
     *        (e.g., "h2" would cause all h2 elements on the page, to be used as items in the generated Table of Contents).
     * @param optionalTitle - An optional title can be provided, if the default "Table of Contents" needs to be changed.
     */
    insertTableOfContents: function() {
      var tocElement = domHelper.getFirstElementByAttributeName("tableOfContents");
      var args = JSON.parse(tocElement.getAttribute("tableOfContents"));

      // add heading
      var title = this.coalesce(args.optionalTitle, "Table of Contents");
      var heading = document.createElement("h2");
      heading.innerHTML = "<b>" + title + "</b>";
      tocElement.appendChild(heading);

      // add contents
      var ul = document.createElement("ul");
      ul.className = args.tocClass;
      var h2Elements = document.getElementsByTagName(args.contentHeaderItemTagName);
      for (var i = 0; i < h2Elements.length; i++) {
        var li = document.createElement("li");
        var tocItem = h2Elements[i];

        if (tocItem !== heading) {
          var tocItemText = h2Elements[i].innerText;

          tocItemText = this.coalesce(tocItemText, tocItem.id);
          li.innerHTML = "<a href=\"#" + tocItem.id + "\">" + tocItemText + "</a>";
          ul.appendChild(li);
        }
      }
      tocElement.appendChild(ul);
    },

    /*
     * Common introduction/header displayed across all of the CSS Summary pages.
     */
    aboutPagePanel: function() {
      var infoPanelElement = domHelper.getFirstElementByAttributeName('aboutPagePanel');

      infoPanelElement.innerHTML += "This page contains the code examples used for the ";
      infoPanelElement.innerHTML += "<a href='http://www.thruzero.com/jcat3/apps/resources/resources.jsf?rid=css.overview'>CSS Summary</a> ";
      infoPanelElement.innerHTML += "at <a href='http://www.thruzero.com/'>ThruZero</a>. ";
      infoPanelElement.innerHTML += "The CSS and HTML code is defined in templates and then rendered live, to immediately expose typos. ";
    },

    /*
     * Perform the following tasks after all CSS, JS and HTML has loaded:
     *   - Insert the About Page panel.
     *   - Insert the default Table of Contents.
     */
    performDefaultOnLoad: function() {
      this.aboutPagePanel();
      this.insertTableOfContents();
    },

    /*
     * Returns the given value if not null, otherwise returns the given defaultValue.
     *
     * @param attributeName - name of attribute of targeted element.
     */
    coalesce: function(value, defaultValue) {
      var result = (value === undefined || value === "") ? defaultValue : value;

      return result;
    }
  };

}(domHelperModule)); // TODO-p1(Geo): jshint says this isn't defined. However, it is defined in the application just before importing this file.
