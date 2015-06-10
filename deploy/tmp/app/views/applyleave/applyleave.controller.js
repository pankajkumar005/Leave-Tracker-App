'use strict';

angular.module('leaveTrackerAppApp')
    .controller('ApplyleaveCtrl', function($scope, $location, $modalInstance) {
        $scope.message = 'Hello';
        $scope.leavetypes = [{
            name: "Paid Time Off (PTO)",
            code: "PTO"
        }, {
            name: "Maternity Leave",
            code: "ML"
        }, {
            name: "Paternity Leave",
            code: "PL"
        }, {
            name: "Compensatory-Off",
            code: "COF"
        }, ];

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

        $scope.apply = function() {
            console.log($scope.fromdate.fdate.mDate);
            console.log($scope.todate.tdate.mDate);
            console.log($scope.leavetype);
            console.log($scope.description);
        };
    });