'use strict';

angular.module('leaveTrackerAppApp')
  .controller('ApplyleaveCtrl', function ($scope, $location) {
    $scope.message = 'Hello';
    $scope.cancleform = function(){
    	  $location.url('/');
    }
  });
