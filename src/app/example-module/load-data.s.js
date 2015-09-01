(function () {
  'use strict';

  angular
    .module('app.exampleModule')
    .factory('loadData', LoadData);

    function LoadData( $q, $http, $timeout ){

      // accessible members up top
      var exports = {
        load: load
      }
      return exports;

      function load(){
        return $q(function(resolve, reject){

          $timeout(function(){
            resolve({ message: 'hello this is ExampleController' });
          }, 1000)

          // $http.get('DATA')
          //  .then(function(response){
          //   if(!response) reject();
          //   if(!response.data) reject();

          //    resolve(response.data);
          //  }, function(error){
          //     reject(error);
          //  })
        })
      }
    }

})();