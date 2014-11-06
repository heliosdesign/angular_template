'use strict';
/* Controllers  */

angular.module('angularApp.controllers', [])

  
  // //////////////////////////////////////////////////////////////////

  //  █████╗ ██████╗ ██████╗      ██████╗██████╗ ████████╗██╗     
  // ██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██╔══██╗╚══██╔══╝██║     
  // ███████║██████╔╝██████╔╝    ██║     ██████╔╝   ██║   ██║     
  // ██╔══██║██╔═══╝ ██╔═══╝     ██║     ██╔══██╗   ██║   ██║     
  // ██║  ██║██║     ██║         ╚██████╗██║  ██║   ██║   ███████╗
  // ╚═╝  ╚═╝╚═╝     ╚═╝          ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝

  // //////////////////////////////////////////////////////////////////
  .controller('appCtrl', function($scope, $location, baseUrl, $rootScope, $q, $routeParams) {

    if( window.location.host === 'localhost' || window.location.host == '205.186.156.50' )
        $rootScope.debug = true;

    if ( $rootScope.debug ){

      console.log('/* DEBUG */')

      window.$rootScope = $rootScope;
      window.$scope = $scope;
      window.q = $q;
      window.$location = $location;
    }


    $scope.appData = {
      baseUrl: baseUrl,
      breadcrumb: null
    };

    $scope.$on('$locationChangeStart', function(){
      console.log('start')
    })

    $scope.$on('$locationChangeSuccess', function(event){
      console.log('success')
      /**
       * If there is not location path there is no view to load,
       * and thus, no controller. Anything for the home view
       * should be done here.
       */
      if (!$location.path()) {
        /**
         * Tell the app which view we're in.
         */
        $scope.appData.currentView = $routeParams.view;
      }
    });

  })

  // //////////////////////////////////////////////////////////////////

// ██╗   ██╗██╗███████╗██╗    ██╗     ██████╗██████╗ ████████╗██╗     
// ██║   ██║██║██╔════╝██║    ██║    ██╔════╝██╔══██╗╚══██╔══╝██║     
// ██║   ██║██║█████╗  ██║ █╗ ██║    ██║     ██████╔╝   ██║   ██║     
// ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║    ██║     ██╔══██╗   ██║   ██║     
//  ╚████╔╝ ██║███████╗╚███╔███╔╝    ╚██████╗██║  ██║   ██║   ███████╗
//   ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝      ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
                                                                   
  // //////////////////////////////////////////////////////////////////

  .controller('viewCtrl', function($scope, $routeParams) {
    /**
     * Tell the app which view we're in.
     */
    $scope.appData.currentView = $routeParams.view;


  })
