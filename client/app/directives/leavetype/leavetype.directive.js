'use strict';

angular.module('leaveTrackerAppApp')
  .directive('leavetype', function () {
    return {
      templateUrl: 'app/directives/leavetype/leavetype.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });