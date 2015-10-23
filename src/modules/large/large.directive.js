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
      templateUrl: 'modules/large/large.directive.html',
      scope: {},
      link: function(scope, $element, attrs){
        scope.vm = {};
        scope.vm.message = 'hey hey';
      }
    };
  }

})();
