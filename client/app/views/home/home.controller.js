'use strict';

angular.module('leaveTrackerAppApp')
  .controller('HomeCtrl', function ($scope,holidayFactory) {
    $scope.message = 'Hello';
    $scope.NewHoliday = '';
    console.log('Before Ajax Call Date' + new Date());
    holidayFactory.getHolidayList().then(function(data){
        console.log(data);
        $scope.Holidays = data;
        console.log('In Response of Ajax call Date' + new Date());
    });
    console.log('After Ajax Call Date' + new Date());

    $scope.deleteHoliday =function(id,$event){
        console.log(id,$event.target);
         holidayFactory.deleteHoliday(id).then(function(data){
             var tmpHolidays = [];
             $($scope.Holidays).each(function(i,n){
                if(n._id != id)
                {
                    tmpHolidays.push(n)
                }
             });

             $scope.Holidays = tmpHolidays;
         });
    };

    $scope.addHoliday = function(){
        var dd = '';
        var mm = '';
        var yyyy ='';
        if($scope.NewHoliday.split('/').length>2)
        {
            var dd = $scope.NewHoliday.split('/')[0];
            var mm = $scope.NewHoliday.split('/')[1];
            var yyyy = $scope.NewHoliday.split('/')[2];
        }
        holidayFactory.addHoliday(dd,mm,yyyy).then(function(data){
            $scope.Holidays.push(data.Holiday);
        });
    };
  });
