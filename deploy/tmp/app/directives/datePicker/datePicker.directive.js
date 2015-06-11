'use strict';

angular.module('leaveTrackerAppApp')
  .directive('fromDatepicker', function ($parse) {
     return function (scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        $(function(){
            element.datepicker({
                showOn:"both",
                changeYear:true,
                changeMonth:true,
                dateFormat:'yy-mm-dd',
                maxDate: new Date(),
                yearRange: '1920:2015',
                onSelect:function (dateText, inst) {
                    scope.$apply(function(scope){
                        // Change binded variable
                        ngModel.assign(scope, dateText);
                    });
                }
            });
        });
    }
  })
   .directive('toDatepicker', function ($parse) {
     return function (scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        $(function(){
            element.datepicker({
                showOn:"both",
                changeYear:true,
                changeMonth:true,
                dateFormat:'yy-mm-dd',
                maxDate: new Date(),
                yearRange: '1920:2015',
                onSelect:function (dateText, inst) {
                    scope.$apply(function(scope){
                        // Change binded variable
                        ngModel.assign(scope, dateText);
                    });
                }
            });
        });
    }
  });