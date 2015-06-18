'use strict';

angular.module('leaveTrackerAppApp')
  .controller('UpcomingCtrl', function($scope, holidayFactory, $location, $localstorage) {
   
    Scopes.store('UpcomingCtrl', $scope);
   
    $scope.removeRow = function (productIndex) {
      $scope.upcomingRecord.splice(productIndex, 1);
    }
    if (localStorage.getItem('uprecord') == null) {
        holidayFactory.getUpcomingDetails().then(function(response) {
            $scope.upcomingRecord = response;
            $localstorage.setObject('uprecord', $scope.upcomingRecord);
        });
    } else {
      console.log('getting from localstrorage',$localstorage.getObject('uprecord'));
      $scope.upcomingRecord = $localstorage.getObject('uprecord');
    }
  }); 