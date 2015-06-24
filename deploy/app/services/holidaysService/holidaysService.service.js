'use strict';

angular.module('leaveTrackerAppApp')
    .factory('holidayFactory', function($q, $http) {
        var myService = {
            getUrl: function()
            {
                var url = "http://corridor.pramati.com/appsPortal/apps/leave/";
                return url;
            },
            getThings: function(request) {
                var deferred = $q.defer();
                var geturl = myService.getUrl();
                console.log(geturl + request);
                var httpPromise = $http.get(geturl+ request);
                httpPromise.then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    console.error(error);
                });
                return deferred.promise;
            },
            getData: function(requestparam) {
                var deferred = $q.defer();
                var httpPromise = $http.get('/deploy/assets/' + requestparam + '.json');
                httpPromise.then(function(response) {
                    deferred.resolve(response);
                    console.log(response);
                }, function(error) {
                    console.error(error);
                });
                return deferred.promise;
            },
            getWFHDetails: function() {
                var promise = myService.getData("wfh").then(function(response) {
                    return response.data.mywfhlist;
                });
                return promise;
            },
            getTeamWFHDetails: function() {
                var promise = myService.getData("wfh").then(function(response) {
                    console.log("wfh team", response.data.teamwfhlist);
                    return response.data.teamwfhlist;
                });
                return promise;
            },
            getQuarterDetails: function() {
                var promise = myService.getData("data").then(function(response) {
                    var quaterlist = [];
                    angular.forEach(response.data.quarterList, function(value, key) {
                    if(value.selected == true)
                    {
                        this.push(value.details);
                    }
                   },quaterlist);
                    console.log(JSON.stringify(quaterlist));
                    return quaterlist;
                });
                return promise;
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
            getHistoryDetails: function(flag) {
                if(flag == true)
                {
                    var getSource =  myService.getThings('my-leaves');                 
                }
                else
                {
                    var getSource = myService.getData("history");                    
                }
                
                var promise = getSource.then(function(response) {
                    
                    return response.data.leaveRecord.leavesHistory;
                });
                return promise;
            },
            getTeamHistoryDetails: function(flag) {
                if(flag == true)
                {
                    var getSource =  myService.getThings('my-teamleaves');                 
                }
                else
                {
                    var getSource = myService.getData("teamleave");                    
                }
                var promise = getSource.then(function(response) {
                    return response.data.teamhist;
                });
                return promise;
            },
            getUpcomingDetails: function(flag) {
                if(flag == true)
                {
                    var getSource =  myService.getThings('my-leaves');                 
                }
                else
                {
                    var getSource = myService.getData("history");                    
                }
                var promise = getSource.then(function(response) {
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
            // addLeave: function(data) {
            //     console.log(data.startDate);
            //      var promise = $http.post('http://corridor.pramati.com/appsPortal/apps/leave/submit?'+ 'leaveType=PTO&reason=TESTING&leaveStartDate=06/05/2015&leaveEndDate=06/05/2015&leaveDays=1&leaveRecordId=4325').then(function(response) {
            //      // var promise = $http.post('http://corridor.pramati.com/appsPortal/apps/leave/submit?'+ 'leaveType='+ data.type +'&reason=TESTING&leaveStartDate='+ data.leaveStartDate+'&leaveEndDate='+ data.leaveEndDate +'&leaveDays=1&leaveRecordId=4325').then(function(response) {
            //         console.log(response.data);
            //     });
            //     return promise;
            // },
        };
        return myService;
    })