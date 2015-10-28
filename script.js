(function() {
  "use strict";
  var currentImage = 0;
  var images, multipleImages;

  function navigateImage(offset) {
    if (currentImage + offset < 0 || currentImage + offset >= images.length) {
      navigateSlide(offset);
      return;
    }
    currentImage += offset;
    for (var i = 0; i < images.length; ++i) {
      images[i].style.display = (i === currentImage) ? 'block' : 'none';
    }
  }

  function navigateSlide(offset) {
    navigate(offset);
    images = document.querySelectorAll(".slide:not(.hidden) img");
    multipleImages = images.length > 1;
    currentImage = (offset > 0) ? 0 : images.length - 1;
    if (multipleImages) {
      navigateImage(0);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.onkeydown = function (e) {
        var kc = e.keyCode;

        // left, down, H, J, backspace, PgUp - BACK
        // up, right, K, L, space, PgDn - FORWARD
        // enter - FULLSCREEN
        if (kc === 37 || kc === 40 || kc === 8 || kc === 72 || kc === 74 || kc === 33) {
          if (multipleImages) {
            navigateImage(-1);
          } else {
            navigateSlide(-1);
          }
        } else if (kc === 38 || kc === 39 || kc === 32 || kc === 75 || kc === 76 || kc === 34) {
          if (multipleImages) {
            navigateImage(1);
          } else {
            navigateSlide(1);
          }
        } else if (kc === 13) {
          toggleFullScreen();
        }
      };

  });
})();
