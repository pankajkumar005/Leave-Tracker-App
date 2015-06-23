'use strict';

angular.module('leaveTrackerAppApp')
  .controller('WfhlistCtrl', function ($scope, holidayFactory, $location, $localstorage, $modal, $log) {
    $scope.message = 'Hello';
     holidayFactory.getTeamWFHDetails().then(function(response) {
        $scope.wfhTeamRecord = response;
        console.log("wfhTeamRecord" + $scope.wfhTeamRecord);
    });
  });
