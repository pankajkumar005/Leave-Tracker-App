'use strict';

angular.module('leaveTrackerAppApp')
  .controller('WfhlistCtrl', function ($scope, holidayFactory, $location, $localstorage, $modal, $log) {
     holidayFactory.getTeamWFHDetails().then(function(response) {
        $scope.wfhTeamRecord = response;
    });
  });
