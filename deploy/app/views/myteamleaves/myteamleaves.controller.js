'use strict';

angular.module('leaveTrackerAppApp')
    .controller('MyteamleavesCtrl', function($scope, holidayFactory, $location, $modal, $log) {
        holidayFactory.getTeamHistoryDetails().then(function(response) {
            console.log("team leave", response);
            $scope.record = response;
        });
        console.log("candidatename==", $scope.candidatename);
    });