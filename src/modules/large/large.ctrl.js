(function () {
  'use strict';

  angular
    .module('app.exampleModule', [])
    .controller('ExampleController', ExampleController);

  function ExampleController($scope, $q, loadData) {
    var vm = this;

    activate();

    vm.message = '';

    // place all start-up logic in this activate() function
    function activate(){
      return $q(function(resolve, reject){
        // load data or whatever is needed, then resolve
        loadData.load()
          .then(function(data){
            vm.message = data.message;
            resolve();
          });
      });
    }
  }

})();