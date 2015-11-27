(function () {
  'use strict';

  angular
    .module('app.exampleModule')
    .controller('ExampleController', ExampleController);

  function ExampleController($scope, $q) {
    var vm = this;

    vm.message = '';

    activate();

    // ********************************************************

    // place all start-up logic in this activate() function
    function activate(){
      vm.message = 'Hi!';
    }
  }

})();