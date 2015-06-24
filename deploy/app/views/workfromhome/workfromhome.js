'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('workfromhome', {
        url: '/wfh',
        templateUrl: 'app/views/workfromhome/workfromhome.html',
        controller: 'WorkfromhomeCtrl'
      });
  });