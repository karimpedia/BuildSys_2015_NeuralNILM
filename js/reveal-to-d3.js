// Adapted from https://github.com/ptamarit/slides-data-viz-web-d3/blob/master/src/js/reveal-to-d3.js

var pt = pt || {};

pt.handleEvent = function(isSlideEvent) {
  'use strict';

  var currentSlideId = Reveal.getCurrentSlide().id;
  var currentFragment = Reveal.getIndices().f;
  console.log(currentFragment);

  // Don't go any further if the slide has no ID (i.e. the string is empty).
  if (!currentSlideId) {
    return;
  }

  // If there is no entry corresponding to the current slide in the map, don't go further.
  var functions = pt.slideIdToFunctions[currentSlideId];
  if (functions == null) {
    return;
  }

  // Call the init function when arriving on a slide for the first time.
  if (isSlideEvent) {
    var initFunction = functions.init;
    if (initFunction != null) {
      initFunction();
      // Make sure we don't call the init function again.
      functions.init = null;
    }
  }

  var fragmentFunction = functions[currentFragment];
  if (fragmentFunction != null) {
    fragmentFunction();
  }
};

pt.handleSlideEvent = function() {
  'use strict';
  pt.handleEvent(true);
};

pt.handleFragmentEvent = function() {
  'use strict';
  pt.handleEvent(false);
};

Reveal.addEventListener('slidechanged', pt.handleSlideEvent);

Reveal.addEventListener('fragmentshown', pt.handleFragmentEvent);

Reveal.addEventListener('fragmenthidden', pt.handleFragmentEvent);
