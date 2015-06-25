'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('request', {
        url: '/request',
        templateUrl: 'app/views/request/request.html',
        controller: 'RequestCtrl'
      });
  });