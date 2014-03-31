/*!
  ~ Copyright (c) 2014 George Norman.
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ --------------------------------------------------------------
  ~ Support functions specific to 'CSS Lab'.
  ~ --------------------------------------------------------------
 */

var cssLabModule = (function(tzDomHelper) {
  "use strict";

  var cssLabHome = "https://github.com/georgenorman/css-lab/blob/master/README.md";

  return {
    /**
     * Do page setup (e.g., render all tags).
     */
    handleOnLoad: function() {
      //
      setupHeader();

      // Tags common to all Labs
      tzTableOfContentsTag.renderAll();
      tzCssBlockTag.renderAll();
      tzCodeExampleTag.renderAll();
      tzHtmlBlockTag.renderAll();
      tzCssHtmlExampleTag.renderAll();
      tzDisplayStylesTag.renderAll();
      tzBulletPointTag.renderAll();

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
    var a = document.createElement("a");

    a.href = cssLabHome;
    a.className = "labHome";

    h1.appendChild(a);
  }

}(tzDomHelperModule));
