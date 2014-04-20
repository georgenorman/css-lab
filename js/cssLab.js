/*!
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
      setupHeader();

      // Tags common to all Labs
      baseKitModule.handleOnLoad();

      // Tags specific to CSS Lab
      cssLabAboutTag.renderAll();
    }
  };

  // ----------------------------------------------
  // Private functions
  // ----------------------------------------------

  /** add a link back to the CSS Lab home page (overlaying the logo background image in the header). */
  function setupHeader() {
    var h1 = tzDomHelper.getFirstElementByTagName("h1");

    tzDomHelper.createElement(h1, "a", '{"href":"'+cssLabHome+'", "className":"labHome"}');
  }

}(tzDomHelperModule, tzLogHelperModule));
