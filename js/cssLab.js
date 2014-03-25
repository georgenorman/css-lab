/*!
  ~ Copyright (c) 2014 George Norman.
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ --------------------------------------------------------------
  ~ Support functions specific to 'CSS Lab'.
  ~ --------------------------------------------------------------
 */

var cssLabModule = (function() {
  "use strict";

  return {
    /**
     * Render all tags.
     */
    handleOnLoad: function() {
      // Common tags for all Labs
      tzTableOfContentsTag.renderAll();
      tzCssBlockTag.renderAll();
      tzCodeExampleTag.renderAll();
      tzHtmlBlockTag.renderAll();
      tzCssHtmlExampleTag.renderAll();
      tzDisplayStylesTag.renderAll();
      tzBulletPointTag.renderAll();

      // CSS Lab specific
      cssLabAboutTag.renderAll();
    }
  };

}());
