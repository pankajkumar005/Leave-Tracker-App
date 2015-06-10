'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeCtrl'
      });
  });
