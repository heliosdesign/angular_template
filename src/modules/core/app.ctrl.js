/*

  App Controller

    body-level controller, use for totally global functionality

*/
;(function () {
  'use strict';

  angular
    .module('app.core', [])
    .controller('AppController', AppController);

  function AppController($scope, $location, $routeParams, globals, features) {
    var app = this;

    app.bodyClass = [];

    // touch detect - can remove this if you're going to use Modernizr
    app.bodyClass.push( features.touch ? 'touch' : 'no-touch' );

    if( window.location.host === 'localhost' || window.location.host === '205.186.156.50' )
      globals.debug = true;

    if ( globals.debug ){
      console.log('/* DEBUG */');
      window.app = app;
      app.bodyClass.push('body-debug');
    }

    $scope.$on('$locationChangeStart', function(){
      console.log('location change');
    });

    $scope.$on('$locationChangeSuccess', function(event){
      console.log('location change success');
    });

  }


})();
