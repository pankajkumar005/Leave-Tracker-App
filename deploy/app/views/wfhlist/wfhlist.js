'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wfhlist', {
        url: '/wfhlist',
        templateUrl: 'app/views/wfhlist/wfhlist.html',
        controller: 'WfhlistCtrl'
      });
  });