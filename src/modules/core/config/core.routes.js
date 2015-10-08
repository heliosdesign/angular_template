(function () {
  angular
    .module('app.core')
    .config(Router);

  function Router($routeProvider){

    $routeProvider.when('/', {
      templateUrl: 'modules/large/home.html',
      controller: 'ExampleController',
      controllerAs: 'vm',
      reloadOnSearch: false,
      resolve: {
        data: function(loader){ return loader.load(); }
      }
    });

    // function loadDataResolve( loadData ){ return loadData; }

    // $routeProvider.when('/:view', {
    //   templateUrl: function(params) {
    //     return 'partials/' + params.view + '.html';
    //   },
    //   controller: 'viewCtrl',
    //   controllerAs: 'vm',
    //   reloadOnSearch: false
    // });

  }
})();