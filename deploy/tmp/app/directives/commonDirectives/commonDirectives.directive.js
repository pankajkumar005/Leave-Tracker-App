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
            scope.arr_leavenum = [];
            holidayFactory.getLeaveCategory().then(function(response) {
                scope.category = response;
                bindData();
            });
            holidayFactory.getLeaveByType().then(function(response) {
                var getleavetype = response;
                angular.forEach(getleavetype, function(value, key) {
                    this.push(value);
                }, scope.arr_leavenum);
                bindData();
            });
            holidayFactory.getUtilizedLeave().then(function(response) {
                scope.getUleave = response;
                bindData();
            });

            function bindData() {
                var colors = Highcharts.getOptions().colors,
                    categories = ['Remaining', 'Availed'],
                    data = [{
                        y: 10,
                        color: colors[0],
                        drilldown: {
                            name: 'Remaining Leave',
                            categories: scope.category,
                            data: [1, 4, 3, 2],
                            color: colors[0]
                        }
                    }, {
                        y: scope.getUleave,
                        color: colors[4],
                        drilldown: {
                            name: 'Availed Leaves',
                            categories: scope.category,
                            data: scope.arr_leavenum,
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

