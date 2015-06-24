'use strict';

angular.module('leaveTrackerAppApp')
    .directive('leaveType', function() {
        return {
            template: '<select required="true" ng-model="selectedValue.code" name= "selecttype" ><option ng-repeat="ty in types" ng-selected="ty.code==selectedValue.code"  value="{{ty.code}}">{{ty.name}}</option></select>',
            restrict: 'E',
            scope: {
                selectedValue: '='
            },
            link: function(scope, elem, attrs) {
                scope.types = [{
                    name: "Please select type",
                    code: "?"
                }, {
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
                }];
                console.log('selected leave type :  ', scope.selectedValue);
                if (scope.selectedValue.code) {
                    scope.selectedValue = scope.selectedValue;
                } else {
                    scope.selectedValue = scope.types[0];
                }

            }
        };
    });