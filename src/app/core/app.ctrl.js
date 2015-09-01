(function () {
  'use strict';

  angular
    .module('app.core', [])
    .controller('AppController', AppController);

  function AppController($scope, $location, $routeParams, globals) {

    var vm = this;

    vm.bodyClass = [];

    if( window.location.host === 'localhost' || window.location.host == '205.186.156.50' )
      globals.debug = true;

    if ( globals.debug ){
      console.log('/* DEBUG */')
      window.appData = vm;
      vm.bodyClass.push('body-debug');
    }

    $scope.$on('$locationChangeStart', function(){
      console.log('location change')
    })

    $scope.$on('$locationChangeSuccess', function(event){
      console.log('location change success')
    });

  }


})();
