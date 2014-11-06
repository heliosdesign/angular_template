'use strict';

angular.module('angularApp', [
  'ngRoute',

  'angularApp.values',
  'angularApp.services',
  'angularApp.directives',
  'angularApp.controllers',

  'heliosFrameRunner'
])
.config(function($routeProvider){

  $routeProvider.when('/:view', {
    templateUrl: function(params) {
      return 'partials/' + params.view + '.html';
    },
    controller: 'viewCtrl',
    reloadOnSearch: false
  });

});

