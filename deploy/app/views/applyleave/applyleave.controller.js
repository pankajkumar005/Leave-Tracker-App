    'use strict';

angular.module('leaveTrackerAppApp')
    .controller('ApplyleaveCtrl', function($scope, $location, $modalInstance, holidayFactory, $localstorage, leaveRecordId) {
        $scope.type = {};
        $scope.itemCount;
        $scope.cancleform = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.dayDiff = function(firstDate,secondDate){
          var date2 = new Date($scope.formatString(secondDate));
          var date1 = new Date($scope.formatString(firstDate));
          var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
          $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
          return $scope.dayDifference;
         }
          
        $scope.formatString = function(format) {
            var month   = parseInt(format.substring(0,2));
            var day  = parseInt(format.substring(3,5));
            var year   = parseInt(format.substring(6,10));
            var date = new Date(year, month-1, day);
            return date;
          }
        if(leaveRecordId == null)
        {
            $scope.apply = function() {
                $scope.itemCount = JSON.parse(localStorage.uprecord).length + 1;

                var uprecord = {
                    "leaveRecordId": $scope.itemCount,
                    "startDate": $scope.fmDate,
                    "endDate": $scope.tDate,
                    "totalDays": ($scope.tDate - $scope.fmDate)/(1000 * 60 * 60 * 24),
                    "availedDays": 1,
                    "reason": $scope.description,
                    "impact": "",
                    "signature": "",
                    "type": $scope.type.code,
                    "status": "WAITING",
                    "candidateName": "Pankaj Kumar",
                    "leaveStartDate": $scope.fmDate,
                    "leaveEndDate": $scope.tDate,
                    "leaveStatus": "Cancelled",
                    "leaveType": "PTO",
                    "leaveCancel": false,
                    "comments": "null",
                    "project": "Software AG",
                    "recordId": 16601
                };

                var upcomingrecordlist = $localstorage.getObject('uprecord') || [];
                upcomingrecordlist.push(uprecord);
                $localstorage.setObject('uprecord', upcomingrecordlist);
                $location.url('/upcoming');
                $scope.cancleform();
            };
        }
        else
        {
            var getRecord = $localstorage.getObject('uprecord');
            var log = [];
            angular.forEach(getRecord, function(value, key) {
                  if(value.leaveRecordId == leaveRecordId)
                  {
                        $scope.fmDate = value.leaveStartDate;
                        $scope.tDate = value.leaveEndDate;
                        $scope.type.code = value.type;
                        $scope.description = value.reason;
                  }
            }, log);
            $scope.apply = function() {
            var upcomingrecordobj = JSON.parse(localStorage.uprecord); 
            var arrlog = [];
            angular.forEach(upcomingrecordobj, function(value, key) {
                if(value.leaveRecordId == leaveRecordId)
                {
                    value.type = $scope.type.code;
                    value.leaveStartDate = $scope.fmDate;
                    value.leaveEndDate = $scope.tDate;
                    value.reason = $scope.description;
                }
                this.push(value);
            }, arrlog);
          
            localStorage.uprecord = JSON.stringify(arrlog);
            $scope.cancleform();
            }

        }

    });