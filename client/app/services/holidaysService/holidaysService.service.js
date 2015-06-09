'use strict';

angular.module('leaveTrackerAppApp')
.factory('holidayFactory', function($q, $http) {
  var myService = {
    getThings: function() {
      var promise = $http.get('/api/things').then(function (response) {
        return response.data;
      });
      return promise;
    },
    getHolidayList:function(){
        var promise =$http.get('/assets/data.json').then(function (response) {
        return response.data.hol;
      });
      return promise;
    },
    addHoliday:function(dd,mm,yyyy){
         var promise = $http.post('/api/holidays/'+dd+'/'+mm+'/'+yyyy).then(function(response){
            return response.data;
         });
        return promise;
    },
    deleteHoliday:function(id){
        var promise = $http.post('/api/holidays/'+id).then(function(response){
            response.data;
         });
        return promise;
    },
    getData:function(){
        var deferred = $q.defer(), 
        httpPromise = $http.get('/assets/data.json');
        httpPromise.then(function (response) {
          console.log(response);
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
        return deferred.promise;
      },
    getLeaveCategory:function(){
        var promise =$http.get('/assets/data.json').then(function (response) {
        return response.data.leaveType;
      });
      return promise;
    },
    getCurrentQuarterDetails:function(){
        var promise =$http.get('/assets/data.json').then(function (response) {
        return response.data.currentQuarterDetails;
      });
      return promise;
    },
  };
  return myService;
});
