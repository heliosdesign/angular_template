/*

  Feature Detection

    Feel free to replace this with Modernizr, but sometimes it’s nice to set some things up yourself.

*/
;(function () {
  'use strict';

  angular
    .module('app')
    .factory('features', features);

  function features($window) {
    var featureList = {
      touch: !!(('ontouchstart' in $window) || $window.DocumentTouch && document instanceof $window.DocumentTouch),
      orientation: !!($window.DeviceOrientationEvent)
    };

    return featureList;
  }

})();
