'use strict';

angular.module('leaveTrackerAppApp')
  .directive('makeBold', function () {
    return {
        template: '<b>{{BoldName}}</b>',
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attrs) {
          scope.BoldName = $(element).attr('data-name');
      }
    };
  });
