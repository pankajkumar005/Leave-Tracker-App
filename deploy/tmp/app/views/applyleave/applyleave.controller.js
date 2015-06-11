'use strict';

angular.module('leaveTrackerAppApp')
    .controller('ApplyleaveCtrl', function($scope, $location, $modalInstance, holidayFactory, Scopes) {
        $scope.type = {};

        $scope.cancleform = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.fromdate = {
            fdate: {
                mDate: ''
            }
        };
        $scope.todate = {
            tdate: {
                mDate: ''
            }
        };

        Scopes.store('ApplyleaveCtrl', $scope);
        $scope.apply = function() {
            var uprecord = {
                "leaveRecordId": 4323,
                "startDate": $scope.fromdate.fdate.mDate,
                "endDate": $scope.todate.tdate.mDate,
                "totalDays": 1,
                "availedDays": 1,
                "reason": $scope.description,
                "impact": "",
                "signature": "",
                "type": $scope.type.code,
                "status": "WAITING",
                "candidateName": "Pankaj Kumar",
                "leaveStartDate": "Jun-05-2015",
                "leaveEndDate": "Jun-05-2015",
                "leaveStatus": "Cancelled",
                "leaveType": "PTO",
                "leaveCancel": false,
                "comments": "null",
                "project": "Software AG",
                "recordId": 16601
            };
            //Scopes.get('UpcomingCtrl').addrecord(uprecord);
            var upcomingrecordlist = Scopes.get('UpcomingRecordList') || [];
            upcomingrecordlist.push(uprecord);
            Scopes.store('UpcomingRecordList',upcomingrecordlist);
            $location.url('/upcoming');
            $scope.cancleform();
        };

    });