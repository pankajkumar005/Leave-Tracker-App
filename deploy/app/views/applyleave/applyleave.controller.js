    'use strict';

angular.module('leaveTrackerAppApp')
    .controller('ApplyleaveCtrl', function($scope, $location, $modalInstance, holidayFactory, Scopes) {
        $scope.type = {};
        $scope.cancleform = function() {
            $modalInstance.dismiss('cancel');
        };
        Scopes.store('ApplyleaveCtrl', $scope);
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
            var upcomingrecordlist = Scopes.get('UpcomingRecordList') || [];
            upcomingrecordlist.push(uprecord);
            Scopes.store('UpcomingRecordList',upcomingrecordlist);
            $location.url('/upcoming');
            $scope.cancleform();
        };
    });