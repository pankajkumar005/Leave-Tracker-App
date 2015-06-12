'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upcoming', {
        url: '/upcoming',
        templateUrl: 'app/views/upcoming/upcoming.html',
        controller: 'UpcomingCtrl'
      });
  });