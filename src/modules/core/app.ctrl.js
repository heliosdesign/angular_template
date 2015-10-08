(function () {
  'use strict';

  angular
    .module('app.core', [])
    .controller('AppController', AppController);

  function AppController($scope, $location, $routeParams, globals) {

    var appData = this;

    appData.bodyClass = [];

    // touch detect - can remove this if you're going to use Modernizr
    var touch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
    appData.bodyClass.push( touch ? 'touch' : 'no-touch' );


    if( window.location.host === 'localhost' || window.location.host === '205.186.156.50' )
      globals.debug = true;

    if ( globals.debug ){
      console.log('/* DEBUG */');
      window.appData = appData;
      appData.bodyClass.push('body-debug');
    }

    $scope.$on('$locationChangeStart', function(){
      console.log('location change');
    });

    $scope.$on('$locationChangeSuccess', function(event){
      console.log('location change success');
    });

  }


})();
