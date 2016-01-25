/*

  Example Small Directive

  <small-directive></small-directive>

  Demonstrates using controllerAs in a directive.
  Increments a number.

*/
(function () {
  'use strict';

  angular
    .module('app')
    .directive('smallDirective', smallDirective);

  function smallDirective(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/small/small.directive.html',

      scope: {},

      link: function(scope, element, attrs){

        scope.vm = {};

        scope.vm.title = 'Small Directive';
        scope.vm.increment = 0;

        scope.vm.action = action;

        // ********************************************************

        function action(){
          scope.vm.increment += 1;
        }
      }
    };
  }

})();
