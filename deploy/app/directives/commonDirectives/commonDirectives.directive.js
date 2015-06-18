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
            scope.arr_leavelist = [];

            holidayFactory.getQuarterDetails().then(function(response) {
                var getleavelist = response;
                console.log(getleavelist);
                angular.forEach(getleavelist[0], function(value, key) {
                    this.push(value);
                }, scope.arr_leavelist);
                console.log(scope.arr_leavelist[3] + scope.arr_leavelist[5]);
                bindData();
            });

            function bindData() {
                var gaugeChart = AmCharts.makeChart("chart_container", {
                    "type": "gauge",
                    "theme": "light",
                    "axes": [{
                        "axisThickness": 10,
                        "axisAlpha": 0.2,
                        "tickAlpha": 1.2,
                        "valueInterval": 1,
                        "bands": [{
                            "color": "#84b761",
                            "endValue": scope.arr_leavelist[5],
                            "startValue": scope.arr_leavelist[3]
                        }, {
                            "color": "#EF7209",
                            "endValue": scope.arr_leavelist[3],
                            "innerRadius": "95%",
                            "startValue": 0
                        }],
                        "bottomText": "0 km/h",
                        "bottomTextYOffset": -20,
                        "endValue": (scope.arr_leavelist[3] + scope.arr_leavelist[5] - 1)
                    }],
                    "arrows": [{}]
                });

                setInterval(randomValue, 2000);

                // set random value
                function randomValue() {
                    var value = ((scope.arr_leavelist[3] + scope.arr_leavelist[5]) - scope.arr_leavelist[4]);
                    if (gaugeChart) {
                        if (gaugeChart.arrows) {
                            if (gaugeChart.arrows[0]) {
                                if (gaugeChart.arrows[0].setValue) {
                                    gaugeChart.arrows[0].setValue(value);
                                    gaugeChart.axes[0].setBottomText(value + "");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})