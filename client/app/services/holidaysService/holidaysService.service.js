'use strict';

angular.module('leaveTrackerAppApp')
.factory('holidayFactory', function($http) {
  var myService = {
    getThings: function() {
      var promise = $http.get('/api/things').then(function (response) {
        return response.data;
      });
      return promise;
    },
    getHolidayList:function(){
        var promise =$http.get('/api/holidays').then(function (response) {
        return response.data;
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
    }
  };
  return myService;
});
