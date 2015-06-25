'use strict';

angular.module('leaveTrackerAppApp')
    .controller('UpcomingCtrl', function($scope, holidayFactory, $location, $localstorage, $modal, $log) {
        $scope.removeRow = function(productIndex) {
            var upcomingrecordobj = JSON.parse(localStorage.uprecord); 
            upcomingrecordobj.splice(productIndex, 1);
            localStorage.uprecord = JSON.stringify(upcomingrecordobj);
            $scope.upcomingRecord.splice(productIndex, 1);

        }
        $scope.removeWFHRow = function(productIndex) {
            var wfhobj = JSON.parse(localStorage.wfhRecord); 
            wfhobj.splice(productIndex, 1);
            localStorage.wfhRecord = JSON.stringify(wfhobj);
            $scope.wfhRecord.splice(productIndex, 1);
        }
        $scope.open2 = function(leaveRecord) {
            var templateUrl = 'app/views/applyleave/applyleave.html';
            var controller = 'ApplyleaveCtrl';

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: templateUrl,
                controller: controller,
                resolve: {
                    leaveRecordId: function(){
                      return leaveRecord;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {}, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        if (localStorage.getItem('uprecord') == null) {
            holidayFactory.getUpcomingDetails().then(function(response) {
                $scope.upcomingRecord = response;
                $localstorage.setObject('uprecord', $scope.upcomingRecord);
            });
        } else {
            $scope.upcomingRecord = $localstorage.getObject('uprecord');
        }

        if (localStorage.getItem('wfhRecord') == null) {
            holidayFactory.getWFHDetails().then(function(response) {
                $scope.wfhRecord = response;
                $localstorage.setObject('wfhRecord', $scope.wfhRecord);
            });
        } else {
            $scope.wfhRecord = $localstorage.getObject('wfhRecord');
        }
    });

