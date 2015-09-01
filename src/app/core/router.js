(function () {
  angular
    .module('app.core')
    .config(Router);

  function Router($routeProvider){

    $routeProvider.when('/', {
      templateUrl: 'app/example-module/home.html',
      controller: 'ExampleController',
      controllerAs: 'vm',
      reloadOnSearch: false,
      // resolve: {
      //   data: loadDataResolve
      // }
    })

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