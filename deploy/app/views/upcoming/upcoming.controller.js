'use strict';

angular.module('leaveTrackerAppApp')
  .controller('UpcomingCtrl', function($scope, holidayFactory, Scopes, $location) {
    Scopes.store('UpcomingCtrl', $scope);
    if (!Scopes.get('UpcomingRecordList')) {
        window.holidayLoadFlag = 0;
        holidayFactory.getUpcomingDetails().then(function(response) {
            $scope.upcomingRecord = response;
            Scopes.store('UpcomingRecordList', $scope.upcomingRecord);
        });
    }else {
        $scope.upcomingRecord = Scopes.get('UpcomingRecordList');
    }
  });