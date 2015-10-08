/*
         ____________________
        |\                   \      l____
        | \___________________\     |\   \
        | |                    |    |\l___\___
   [__]_[ |                    |[\\]| |__|_\__\
  /\[__]\ |                    |\[\\]\|. | |===\
  \ \[__]\[____________________] \[__]|__|..___]
   \/.-.\_______________________\/.-.\____\/.-.\
    ( @ )                        ( @ )  =  ( @ )
     `-'                          `-'       `-'

  Data loader

    This service handles data (ie json) (pre)loading for the app.
    Use it as a resolve function for views.

    resolve: {
      data: function(loader){ return loader.load() }
    }

    If you want a service to have access to the data before rendering
    begins, send them the data using in the load() function. Otherwise
    just use Angular’s native injection functionality.

*/
;(function () {
  'use strict';

  angular
    .module('app')
    .factory('loader', loader);

  function loader($q, $http){

    return { load: load }

    function load(){
      return $q(function(resolve, reject){
        $http.get('./modules/core/assets/example-data.json')
          .then(function(res){
            console.log('DATA', res.data);

            // process the data here, if required

            // send the data to services, if desired (ie service.setData(res.data))

            resolve(res.data)
          })
          .catch(reject)
      })
    }

  }

})();
