'use strict';

angular.module('leaveTrackerAppApp')
    .controller('HomeCtrl', function($scope, holidayFactory, $location, $modal, $log) {
        $scope.animationsEnabled = true;

        $scope.open = function(modaltype, recordid) {

            if(modaltype == "wfh")
            {
                var templateUrl = 'app/views/workfromhome/workfromhome.html?id=0';
                var controller = 'WorkfromhomeCtrl';
            }
            else
            {
                var templateUrl = 'app/views/applyleave/applyleave.html';
                var controller = 'ApplyleaveCtrl';
            }
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: templateUrl,
                controller: controller,
                resolve: {
                    leaveRecordId: function(){
                      return null;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    })