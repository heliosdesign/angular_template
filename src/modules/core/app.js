/**
 * The main starting script.
 *
 * A global function, 'AppConfig', is used to deal with any modules in the app.
 * The main module is then registered with the vendor dependencies.
 *
 * Any module can easily be registered anywhere without having to come back here
 * to declare it. Just call: AppConfig.registerModule('app.modulename', [any, dependencies]);
 */


// Init the application configuration module for AngularJS application
var AppConfig = (function() {
  'use strict';
  // Init module configuration options
  var appModuleName = 'app';
  var appModuleVendorDependencies = ['ngAnimate', 'ui.router'];

  // Add a new module
  var registerModule = function(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(appModuleName).requires.push(moduleName);
  };

  return {
    appModuleName: appModuleName,
    appModuleVendorDependencies: appModuleVendorDependencies,
    registerModule: registerModule
  };
})();

(function() {
  'use strict';
  //Start by defining the main module and adding the module dependencies
  angular.module(AppConfig.appModuleName, AppConfig.appModuleVendorDependencies);
})();