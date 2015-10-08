/*

  Example Small Directive

  <small-directive></small-directive>

  Demonstrates using controllerAs in a directive.
  Increments a number.

*/
;(function () {
  'use strict';

  angular
    .module('app.exampleModule')
    .directive('smallDirective', smallDirective);

  function smallDirective(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/small/small.directive.html',

      scope: {},

      // see Readme for explanation of controllerAs
      controller: smallDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function smallDirectiveController(){
    var vm = this;
    vm.title = 'Small Directive';
    vm.increment = 0;

    vm.action = action;
    function action(){
      vm.increment += 1;
    }
  }

})();
