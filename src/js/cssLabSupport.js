/*
  ~ Copyright (c) 2014 George Norman.
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ --------------------------------------------------------------
  ~ Support functions specific to 'CSS Lab'.
  ~ --------------------------------------------------------------
 */

var cssLabModule = (function(tzDomHelper, tzLogHelper) {
  "use strict";

  var cssLabHome = "./index.html";

  return {
    /**
     * Do page setup (e.g., render all tags).
     */
    handleOnLoad: function() {
      // enable/disable logging
      tzLogHelper.disableLogging();

      // add a link back to the CSS Lab home page
      setupHeader(cssLabHome);

      // set global "back-to" links (so they don't need to be passed into each <lk-back-to> tag).
      lkBackToTag.setGlobalLinks({"⬅ To Index":cssLabHome, "⬆ To Table of Contents":"#tableOfContents"});

      // render the baseKit tags (these are tags that are common to all Labs)
      baseKitModule.handleOnLoad();

      // render the tags that are specific to CSS Lab
      cssLabAboutTag.renderAll();

      // hide the progress bar, show content
      baseKitModule.handlePageLoadCompleted("page-load-progress");
    }
  };

  // ----------------------------------------------
  // Private functions
  // ----------------------------------------------

  /** add a link back to the CSS Lab home page (overlaying the logo background image in the header). */
  function setupHeader(cssLabHome) {
    var h1 = tzDomHelper.getFirstElementByTagName("h1");

    tzDomHelper.createElement(h1, "a", '{"href":"'+cssLabHome+'", "className":"labHome"}');
  }

}(tzDomHelperModule, tzLogHelperModule));
