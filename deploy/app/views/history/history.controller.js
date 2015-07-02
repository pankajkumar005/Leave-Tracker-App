'use strict';

angular.module('leaveTrackerAppApp')
    .controller('HistoryCtrl', function($scope, holidayFactory, $localstorage) {
        $scope.message = 'Hello';
        $scope.bject = function(arr) {
            var rv = {};
            for (var i = 0; i < arr.length; ++i)
                rv = arr[i];
            return rv;
        };

        if (localStorage.getItem('histroy') == null) {
            holidayFactory.getHistoryDetails().then(function(response) {
                console.log(response);
                $scope.record = response;
                $localstorage.setObject('histroy', $scope.record);
            });
        } else {
            $scope.record = $localstorage.getObject('histroy');
        }

    });