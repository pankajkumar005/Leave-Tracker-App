'use strict';

angular.module('leaveTrackerAppApp')
  .controller('MainCtrl', function ($scope, $http,holidayFactory) {
    $scope.awesomeThings = [];
    //console.log('Service Name'+holidaysService.Name);
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    console.log('Before Ajax Call Date' + new Date());
    holidayFactory.getHolidayList().then(function(data){
        console.log(data);
        console.log('In Response of Ajax call Date' + new Date());
    });
    console.log('After Ajax Call Date' + new Date());

  });
