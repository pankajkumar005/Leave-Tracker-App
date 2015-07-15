'use strict';

angular.module('leaveTrackerAppApp')
  .controller('WfhlistCtrl', function ($scope, holidayFactory, $location, $localstorage, $modal, $log) {
     holidayFactory.getTeamWFHDetails().then(function(response) {
        $scope.wfhTeamRecord = response;
        $scope.empname = [];
        console.log("wfhresponse", response);
         angular.forEach(response, function(value, key) {
                if (this.indexOf(value.empName) == -1) {
             		this.push(value.empName);
                }
            }, $scope.empname);
    });
  });
