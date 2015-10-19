(function () {
  angular
    .module('app.core')
    .run(HandleStateChangeError);

  function HandleStateChangeError($rootScope, $state){

    // Redirect to error state
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      return $state.go('error');
    });

  }
})();