'use strict';

angular.module('leaveTrackerAppApp')
  .controller('UpcomingCtrl', function ($scope, holidayFactory, Scopes,$location) {

  console.log('loading upcoming controller');
   Scopes.store('UpcomingCtrl', $scope);
    $scope.message = 'Hello';
    if(!Scopes.get('UpcomingRecordList'))
    { 
    	window.holidayLoadFlag = 0;
	    holidayFactory.getUpcomingDetails().then(function(response) {
	        $scope.upcomingRecord = response;
	        Scopes.store('UpcomingRecordList', $scope.upcomingRecord);

	    });
 	}else{
 		$scope.upcomingRecord = Scopes.get('UpcomingRecordList');
 	}

     $scope.addrecord = function(getrecord){
     	$scope.upcomingRecord.push(getrecord);
     	console.log($scope.upcomingRecord.length); 
     	
     };
  });
