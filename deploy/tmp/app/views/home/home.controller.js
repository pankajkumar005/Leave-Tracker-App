'use strict';

angular.module('leaveTrackerAppApp')
    .controller('HomeCtrl', function($scope, holidayFactory, $location, $modal, $log) {
        $scope.showfrom = function() {
            $location.url('/applyleave');
        };

        $scope.animationsEnabled = true;

        $scope.open = function(size) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/views/applyleave/applyleave.html',
                controller: 'ApplyleaveCtrl',
                size: size,
                resolve: {
                    // items: function() {
                    //     return $scope.items;
                    // }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                // $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    })