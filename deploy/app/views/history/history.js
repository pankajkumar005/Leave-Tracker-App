'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('history', {
        url: '/history',
        templateUrl: 'app/views/history/history.html',
        controller: 'HistoryCtrl'
      });
  });