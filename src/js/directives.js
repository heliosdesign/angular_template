'use strict';

/* Directives */

angular.module('angularApp.directives', [])
  // VIEW
  //   ╚═══╝  ╚═╝╚═════╝      ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝ 

  .directive('view-wrapper', function($location, $rootScope) {
    return {
    restrict: 'C',
    link: function($scope, $elem, attrs) {
      $elem.append('<h1>'+$scope.appData.currentView+'</h1>')
          
    }
  }})
