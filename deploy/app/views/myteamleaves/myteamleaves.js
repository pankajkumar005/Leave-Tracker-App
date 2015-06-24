'use strict';

angular.module('leaveTrackerAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myteamleaves', {
        url: '/teamleave',
        templateUrl: 'app/views/myteamleaves/myteamleaves.html',
        controller: 'MyteamleavesCtrl'
      });
  });