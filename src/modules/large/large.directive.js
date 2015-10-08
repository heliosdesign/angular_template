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
      replace: true,
<<<<<<< HEAD:src/modules/example/example.directive.js
      templateUrl: 'modules/example/example-directive.html',
=======
      templateUrl: 'modules/large/large.directive.html',
>>>>>>> master:src/modules/large/large.directive.js
      scope: {},

      controller: ExampleDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function ExampleDirectiveController($scope){
    var vm = this;
    vm.message = 'hey hey';
  }

})();
