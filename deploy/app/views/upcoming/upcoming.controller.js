'use strict';

angular.module('leaveTrackerAppApp')
    .controller('UpcomingCtrl', function($scope, holidayFactory, $location, $localstorage, $modal, $log) {
        $scope.removeRow = function(productIndex) {
            $scope.upcomingRecord.splice(productIndex, 1);
        }
        $scope.removeWFHRow = function(productIndex) {
            $scope.wfhRecord.splice(productIndex, 1);
        }
        $scope.open2 = function(leaveRecord) {
            console.log('in open');
            console.log('leaveRecord' + leaveRecord);

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
            console.log('getting from localstrorage', $localstorage.getObject('uprecord'));
            $scope.upcomingRecord = $localstorage.getObject('uprecord');
        }

        if (localStorage.getItem('wfhRecord') == null) {
            holidayFactory.getWFHDetails().then(function(response) {
                $scope.wfhRecord = response;
                console.log("wfh" + $scope.wfhRecord);
                $localstorage.setObject('wfhRecord', $scope.wfhRecord);
            });
        } else {
            console.log('getting from localstrorage', $localstorage.getObject('wfhRecord'));
            $scope.wfhRecord = $localstorage.getObject('wfhRecord');
        }
    });