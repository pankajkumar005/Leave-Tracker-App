'use strict';

angular.module('leaveTrackerAppApp')
    .factory('holidayFactory', function($q, $http) {
        var myService = {
            getThings: function() {
                var promise = $http.get('/api/things').then(function(response) {
                    return response.data;
                });
                return promise;
            },
            getHolidayList: function() {
                var promise = myService.getData("data").then(function(response) {
                    return response.data.hol;
                });
                return promise;
            },
            addHoliday: function(dd, mm, yyyy) {
                var promise = $http.post('/api/holidays/' + dd + '/' + mm + '/' + yyyy).then(function(response) {
                    return response.data;
                });
                return promise;
            },
            deleteHoliday: function(id) {
                var promise = $http.post('/api/holidays/' + id).then(function(response) {
                    response.data;
                });
                return promise;
            },
            getData: function(requestparam) {
                var deferred = $q.defer();
                var httpPromise = $http.get('/deploy/assets/' + requestparam + '.json');
                httpPromise.then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    console.error(error);
                });
                return deferred.promise;
            },
            getLeaveCategory: function() {
                var promise = myService.getData("data").then(function(response) {
                    var category = [];
                    angular.forEach(response.data.leaveType, function(value, key) {
                    this.push(value.value);
                   }, category);
                    return category;

                });
                return promise;
            },
            getCurrentQuarterDetails: function() {
                var promise = myService.getData("data").then(function(response) {
                    return response.data.currentQuarterDetails;
                });
                return promise;
            },
            getHistoryDetails: function() {
                var promise = myService.getData("history").then(function(response) {
                    myService.getLeaveByType();
                    return response.data.leaveRecord.leavesHistory;
                });
                return promise;
            },
            getUpcomingDetails: function() {
                var promise = myService.getData("history").then(function(response) {
                    return response.data.leaveRecord.leavesUpcoming;
                });
                return promise;
            },
            getUtilizedLeave: function() {
                var promise = myService.getData("history").then(function(response) {
                    return response.data.leaveRecord.numLeavesUtilized;
                });
                return promise;
            },
            getPTOLeft: function() {
                var promise = myService.getData("history").then(function(response) {
                    return response.data.leaveRecord.numPTOLeavesLeft;
                });
                return promise;
            },
            getLeaveByType: function() {
              var promise = myService.getData("history").then(function(response) {
                var type = [];
                var ptocount = 0;
                var mcount = 0;
                var pcount = 0;
                var ccount = 0;
                console.log(response.data.leaveRecord.leavesHistory);
                  angular.forEach(response.data.leaveRecord.allLeaves, function(value, key) {
                    if(value.status != "CANCELLED")
                    {  
                      console.log(value.status);
                      if(value.type == "PTO")
                      {
                          ptocount = ptocount + value.availedDays;
                      }
                    }
                  });
                  console.log('pto type: ' + ptocount);
                  var arr_num = {
                    "PTO": ptocount,
                    "ML": mcount,
                    "PL": pcount,
                    "COF": ccount,
                  }
                  return arr_num;
              });
              return promise;
            },
        };
        return myService;
    })
    .factory('Scopes', function($rootScope) {
        var mem = {};

        return {
            store: function(key, value) {
                $rootScope.$emit('scope.stored', key);
                mem[key] = value;
            },
            get: function(key) {
                return mem[key];
            }
        };
    });