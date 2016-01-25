/*

  Example Large Controller Test

  Demonstrates how to test a controller.
  1) Checks to see that the vm.message variable is set correctly.

*/
(function(AppConfig) {
  'use strict';
  describe('Example controller test for large module.', function() {

    var $scope,
        ExampleController;

    // Make sure that the app module exists.
    beforeEach(module(AppConfig.appModuleName));

    // Set up the controller and its scope.
    beforeEach(inject(function($controller, $rootScope) {
      $scope = $rootScope.$new();

      ExampleController = $controller('ExampleController as vm', {
        $scope: $scope
      });
    }));

    // The actual tests.
    it('Message should be Hi!', function() {
      expect($scope.vm.message).toBe('Hi!');
    });

  });
})(AppConfig);
