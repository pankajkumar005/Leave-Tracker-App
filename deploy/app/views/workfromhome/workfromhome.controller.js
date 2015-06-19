'use strict';

angular.module('leaveTrackerAppApp')
  .controller('WorkfromhomeCtrl', function ($scope, $location, $modalInstance, $localstorage) {
 	$scope.canclewfhform = function() {
            $modalInstance.dismiss('cancel');
        };
    $scope.applywfh = function() {
            var wfhRecord = {
                "recordId": 4323,
                "from": $scope.wfmDate,
                "to": $scope.wtDate,
                "days": 1,
                "reason": $scope.reason,
            };

            var upcomingrecordlist = $localstorage.getObject('wfhRecord') || [];
            upcomingrecordlist.push(wfhRecord);
            $localstorage.setObject('wfhRecord', upcomingrecordlist);
            $location.url('/upcoming');
            $scope.canclewfhform();
        };
  });
