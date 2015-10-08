;(function () {
  'use strict';

  angular
    .module('app', [

      'ngRoute', // 'ui.router',
      'ngAnimate',
      'ngSanitize',
      'ngTouch',

      'app.core',
      'app.exampleModule',

      'heliosFrameRunner'
    ]);

})();