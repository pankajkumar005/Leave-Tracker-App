'use strict';

angular.module('leaveTrackerAppApp', [
  'ui.router',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(false);
  });
