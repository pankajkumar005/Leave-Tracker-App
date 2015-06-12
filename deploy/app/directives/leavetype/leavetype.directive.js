'use strict';

angular.module('leaveTrackerAppApp')
  .directive('leaveType', function () {
    return {
        template: '<select required="true" ng-model="selectedValue" name= "selecttype" ng-options="t.name for t in types"></select>',
        restrict: 'E',
        scope: {
           selectedValue: '='
        },
        link:function(scope,elem,attrs){
           scope.types = [{
	            name: "Please select type",
	            code: ""
	        },{
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
	        }
		  ];
		  scope.selectedValue=scope.types[0];
		        }
      	};
  });