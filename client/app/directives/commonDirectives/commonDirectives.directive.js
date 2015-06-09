'use strict';

var app = angular.module('leaveTrackerAppApp')
app.directive('makeBold', function() {
    return {
        template: '<b>{{BoldName}}</b>',
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attrs) {
            scope.BoldName = $(element).attr('data-name');
        }
    }
})
app.directive('piechart', function(holidayFactory) {


    return {
        template: '<div id="chart_container" style="margin: 0 auto">not working</div>',
        restrict: 'E',
        replace: true,
        //  scope: true,
        link: function(scope, element, attrs) {
            scope.arr_category = [];
            holidayFactory.getLeaveCategory().then(function(response) {
                var category = response;
                angular.forEach(category, function(value, key) {
                    this.push(value.value);
                }, scope.arr_category);
                bindData();
            });
            console.log('After ajax call ' + new Date);

            function bindData() {
                var colors = Highcharts.getOptions().colors,
                    categories = ['Remaining', 'Availed'],
                    data = [{
                        y: 10,
                        color: colors[0],
                        drilldown: {
                            name: 'Remaining Leave',
                            categories: scope.arr_category,
                            data: [1, 5, 2, 2],
                            color: colors[0]
                        }
                    }, {
                        y: 10,
                        color: colors[4],
                        drilldown: {
                            name: 'Availed Leaves',
                            categories: scope.arr_category,
                            data: [1, 4, 3, 2],
                            color: colors[4]
                        }
                    }],
                    LeaveStatus = [],
                    LeaveType = [],
                    i,
                    j,
                    dataLen = data.length,
                    drillDataLen,
                    brightness;


                // Build the data arrays
                for (i = 0; i < dataLen; i += 1) {

                    // add browser data
                    LeaveStatus.push({
                        name: categories[i],
                        y: data[i].y,
                        color: data[i].color
                    });

                    // add version data
                    drillDataLen = data[i].drilldown.data.length;
                    for (j = 0; j < drillDataLen; j += 1) {
                        brightness = 0.2 - (j / drillDataLen) / 5;
                        LeaveType.push({
                            name: data[i].drilldown.categories[j],
                            y: data[i].drilldown.data[j],
                            color: Highcharts.Color(data[i].color).brighten(brightness).get()
                        });
                    }
                }
                // Create the chart
                $('#chart_container').highcharts({
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },

                    plotOptions: {
                        pie: {
                            shadow: false,
                            center: ['50%', '50%']
                        }
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    series: [{
                        name: 'Leave',
                        data: LeaveStatus,
                        size: '60%',
                        dataLabels: {
                            formatter: function() {
                                return this.point.name;
                            },
                            color: 'blue',
                            distance: -30
                        }
                    }, {
                        name: 'Leave',
                        data: LeaveType,
                        size: '80%',
                        innerSize: '60%',
                        dataLabels: {
                            formatter: function() {
                                // display only if larger than 1
                                return this.point.name + ': ' + this.y;
                            },
                            color: 'blue',
                        }
                    }]
                });
            }
        }
    }
})

// app.directive('uiDate', function() {
//     return {
//       require: '?ngModel',
//       link: function($scope, element, attrs, controller) {
//         var originalRender, updateModel, usersOnSelectHandler;
//         if ($scope.uiDate == null) $scope.uiDate = {};
//         if (controller != null) {
//           updateModel = function(value, picker) {
//             return $scope.$apply(function() {
//               return controller.$setViewValue(element.datepicker("getDate"));
//             });
//           };
//           if ($scope.uiDate.onSelect != null) {
//             usersOnSelectHandler = $scope.uiDate.onSelect;
//             $scope.uiDate.onSelect = function(value, picker) {
//               updateModel(value);
//               return usersOnSelectHandler(value, picker);
//             };
//           } else {
//             $scope.uiDate.onSelect = updateModel;
//           }
//           originalRender = controller.$render;
//           controller.$render = function() {
//             originalRender();
//             return element.datepicker("setDate", controller.$viewValue);
//           };
//         }
//         return element.datepicker($scope.uiDate);
//       }
//     };
//   });