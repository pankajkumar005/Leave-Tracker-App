'use strict';

angular.module('leaveTrackerAppApp')
  .controller('HistoryCtrl', function ($scope, holidayFactory) {
    $scope.message = 'Hello';
     holidayFactory.getHistoryDetails().then(function(response) {
        console.log(response);
        $scope.record = response;
    });



  });
