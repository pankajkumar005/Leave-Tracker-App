    'use strict';

angular.module('leaveTrackerAppApp')
    .controller('ApplyleaveCtrl', function($scope, $location, $modalInstance, holidayFactory, $localstorage, leaveRecordId) {
        $scope.type = {};
        $scope.itemCount;
        $scope.cancleform = function() {
            $modalInstance.dismiss('cancel');
        };
            
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
                    "status": "APPLIED",
                    "candidateName": "Pankaj Kumar"+$scope.itemCount,
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