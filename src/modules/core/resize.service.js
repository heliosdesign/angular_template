/*

  Resize

    Handles the actual window resize event.

    If your module needs to run a function on resize, add a listener like so:

      $rootScope.$on('resize', function(e, data){
        // resize your component, maybe using the data object
      })

    If you need to manually trigger a resize event for your module,
    call resize.trigger(). It’ll return the data object it would normally emit.

*/
;(function () {
  'use strict';

  angular
    .module('app')
    .factory('resize', resize);

  function resize($rootScope, features) {

    var windowResize = _.debounce(function(){ resizeFunction(true); }, 100, false);

    window.addEventListener('resize', windowResize, false);

    if( features.orientation ){
      window.addEventListener('deviceorientation', windowResize, false);
      window.addEventListener('orientationchange', windowResize, false);
    }

    $timeout(windowResize, 500);

    return {
      trigger: resizeFunction
    };

    // ********************************************************

    function resizeFunction(emit){
      var data = {
        cover: cover(),
        contain: contain()
      };

      if(emit) $rootScope.$emit('resize', data);
      return data;
    }

    // equivalent to css background-size: cover
    function cover(ratio){
      var w, h, t, l;

      w = window.innerWidth;
      h = w * ratio;

      if(h < window.innerHeight) {
        h = window.innerHeight;
        w = h / ratio;
      }

      t = (window.innerHeight - h) / 2;
      l = (window.innerWidth - w) / 2;

      return {
        w: Math.round(w),
        h: Math.round(h),
        t: Math.round(t),
        l: Math.round(l)
      };
    }

    // equivalent to css background-size: contain
    function contain(ratio){
      var w, h, t, l;
      w = window.innerWidth;
      h = w * ratio;

      if(h > window.innerHeight) {
        h = window.innerHeight;
        w = h / ratio;
      }

      t = (window.innerHeight - h) / 2;
      l = (window.innerWidth - w) / 2;

      return {
        w: Math.round(w),
        h: Math.round(h),
        t: Math.round(t),
        l: Math.round(l)
      };
    }

  }

})();
