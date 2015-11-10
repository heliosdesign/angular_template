(function () {
  'use strict';

  angular
    .module('app')
    .controller('ErrorController', ErrorController);

  function ErrorController($scope) {
    var vm = this;
    vm.message = 'Error!';
  }

})();