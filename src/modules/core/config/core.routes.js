/*

  Router

    using ui-router

*/
;(function () {
  angular
    .module('app.core')
    .config(Router);

  function Router($urlRouterProvider, $stateProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/large/home.html',
        controller: 'ExampleController',
        controllerAs: 'vm',
        reloadOnSearch: false,
        resolve: {
          data: function(loader){ return loader.load(); }
        },
      })
      .state('error', {
        templateUrl: 'modules/error/error.controller.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
      });

  }
})();