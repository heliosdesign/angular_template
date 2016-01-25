/*

  Example Small Directive Test

  Demonstrates how to test a directive.
  1) Checks to see that a title variable is set correctly.
  2) Tests that the vm.action() function increments the vm.increment variable.

*/
(function(AppConfig) {
  'use strict';

  describe('Small directive test for small moduel.', function() {

    var $scope,
        element,
        vm;

    // Make sure that the app module exists.
    beforeEach(module(AppConfig.appModuleName));
    // Include the template module (set in karma.config.js) for directives.
    beforeEach(module('template-module'));

    // Set up and compile the directive.
    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();

      element = '<small-directive></small-directive>';

      element = $compile(element)($scope);
      $scope.$digest();

      vm = element.isolateScope().vm;
    }));

    // The actual tests.
    it('Should set the vm.title.', function() {
      expect(vm.title).toBe('Small Directive');
    });

    it('Should increment the value on click.', function() {
      expect(vm.increment).toBe(0);
      vm.action();
      expect(vm.increment).toBe(1);
    });

  });

})(AppConfig);
