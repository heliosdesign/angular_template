'use strict';

angular.module('angularApp', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'ngTouch',

  'angularApp.values',
  'angularApp.services',
  'angularApp.directives',
  'angularApp.controllers',

  'heliosFrameRunner'
])

.config(function($routeProvider){

  $routeProvider.when('/', {
    templateUrl: 'partials/home.html',
    controller: 'viewCtrl',
    reloadOnSearch: false
  })

  // $routeProvider.when('/:view', {
  //   templateUrl: function(params) {
  //     return 'partials/' + params.view + '.html';
  //   },
  //   controller: 'viewCtrl',
  //   reloadOnSearch: false
  // });

});

