'use strict';

angular.module('leaveTrackerAppApp')
  .controller('UpcomingCtrl', function ($scope, holidayFactory) {
    $scope.message = 'Hello';
     holidayFactory.getUpcomingDetails().then(function(response) {
        console.log(response);
        $scope.record = response;
    });

  });
