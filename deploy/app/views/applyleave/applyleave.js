'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('applyleave', {
        url: '/applyleave',
        templateUrl: 'app/views/applyleave/applyleave.html',
        controller: 'ApplyleaveCtrl'
      });
  });