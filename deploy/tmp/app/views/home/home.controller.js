'use strict';

angular.module('leaveTrackerAppApp')
  .controller('HomeCtrl', function ($scope,holidayFactory, $location) {
   $scope.open = function() {
      $scope.showModal = true;
      console.log('open method');
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
    $scope.showfrom = function(){
      $location.url('/applyleave');
    };
  });
