'use strict';

angular.module('leaveTrackerAppApp')
  .directive('fromDatepicker', function ($parse) {
     return function (scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        $(function(){
            element.datepicker({
                showOn:"both",
                buttonText: 'Show Date',
                buttonImageOnly: true,
                buttonImage: '../assets/images/calender.svg',
                changeYear:true,
                scope: {
                    fromDatepicker: '=',
                    required: '='
                },
                changeMonth:true,
                dateFormat:'M/dd/yy',
                yearRange: '2015:2017',
                minDate: 0,
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
                buttonText: 'Show Date',
                buttonImageOnly: true,
                buttonImage: '../assets/images/calender.svg',
                changeYear:true,
                changeMonth:true,
                dateFormat:'M/dd/yy',
                yearRange: '2015:2017',
                minDate: 0,
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