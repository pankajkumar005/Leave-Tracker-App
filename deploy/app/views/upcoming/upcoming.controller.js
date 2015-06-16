'use strict';

angular.module('leaveTrackerAppApp')
  .controller('UpcomingCtrl', function($scope, holidayFactory, Scopes, $location) {
    Scopes.store('UpcomingCtrl', $scope);
    if (!Scopes.get('UpcomingRecordList')) {
        window.holidayLoadFlag = 0;
        holidayFactory.getUpcomingDetails().then(function(response) {
            $scope.upcomingRecord = response;
            Scopes.store('UpcomingRecordList', $scope.upcomingRecord);
            // localStorage.setItem("UpcomingRecordList", JSON.stringify($scope.upcomingRecord));
            // console.log(localStorage.getItem("UpcomingRecordList"));
        });
    } /*else if (localStorage.length != 0) {
        console.log(JSON.stringify(Scopes.get('UpcomingRecordList')));
        localStorage.setItem( 'UpcomingRecordList', JSON.stringify(Scopes.get('UpcomingRecordList')));
        console.log(localStorage.getItem("UpcomingRecordList"));
        $scope.upcomingRecord = $scope.$eval(localStorage.getItem("UpcomingRecordList"));
        localStorage.removeItem("UpcomingRecordList");
    }*/ else {
        $scope.upcomingRecord = Scopes.get('UpcomingRecordList');
    }
  });