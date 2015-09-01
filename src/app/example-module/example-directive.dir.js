/*

  Example Directive

  usage: <example-directive></example-directive>

*/
(function () {
  'use strict';

  angular
    .module('app.exampleModule')
    .directive('exampleDirective', ExampleDirective);

  function ExampleDirective(){
    return {
      restrict: 'E',
      templateUrl: 'app/example-module/example-directive.html',
      scope: {},
      controller: ExampleDirectiveController,
      controllerAs: 'vm'
    }
  }

  function ExampleDirectiveController($scope){
    var vm = this;
    vm.message = 'hey hey';
  }

})();
