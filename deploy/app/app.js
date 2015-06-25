'use strict';

angular.module('leaveTrackerAppApp', [
  'ui.router',
  'ngRoute',
  'ui.bootstrap',
  'ngGrid'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(false);
  })

.run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });
});