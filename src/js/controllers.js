'use strict';

angular.module('angularApp.controllers', [])

  .controller('appCtrl', function($scope, $location, $rootScope, $routeParams) {

    if( window.location.host === 'localhost' || window.location.host == '205.186.156.50' )
      $rootScope.debug = true;

    if ( $rootScope.debug ){
      console.log('/* DEBUG */')
      window.$rootScope = $rootScope;
      window.$scope = $scope;
    }

    $scope.appData = {}

    $scope.$on('$locationChangeStart', function(){
      console.log('location change')
    })
    $scope.$on('$locationChangeSuccess', function(event){
      console.log('location change success')
    });

  })

  .controller('viewCtrl', function($scope, $routeParams) {
    console.log('hello this is viewCtrl')
  })
