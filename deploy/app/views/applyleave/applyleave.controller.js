    'use strict';

angular.module('leaveTrackerAppApp')
    .controller('ApplyleaveCtrl', function($scope, $location, $modalInstance, holidayFactory, $localstorage) {
        $scope.type = {};

        $scope.cancleform = function() {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.apply = function() {
            var uprecord = {
                "leaveRecordId": 4323,
                "startDate": $scope.fmDate,
                "endDate": $scope.tDate,
                "totalDays": 1,
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
    });