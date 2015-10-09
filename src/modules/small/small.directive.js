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

      // see wiki for explanation of controllerAs
      controller: SmallDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function SmallDirectiveController($scope){
    var vm = this;
    vm.title = 'Small Directive';
    vm.increment = 0;

    vm.action = action;
    function action(){
      vm.increment += 1;
    }
  }

})();
