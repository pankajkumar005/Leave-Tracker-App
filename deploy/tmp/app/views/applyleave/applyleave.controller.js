'use strict';

angular.module('leaveTrackerAppApp')
  .controller('ApplyleaveCtrl', function ($scope, $location) {
    $scope.message = 'Hello';
    $scope.cancleform = function(){
    	  $location.url('/');
    };

    $scope.fromdate = {
        fdate: {
            mDate: ''
        }
    };
    $scope.todate = {
        tdate: {
            mDate: ''
        }
    };
  });
