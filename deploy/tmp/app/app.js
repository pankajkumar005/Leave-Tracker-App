'use strict';

angular.module('leaveTrackerAppApp', [
  'ui.router',
  'ngRoute'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(false);
  });
