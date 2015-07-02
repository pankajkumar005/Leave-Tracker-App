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
        template: '<div id="chart_container" style="margin: 0 auto">not working<div id="legenddiv" ></div></div>',
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {
            scope.arr_leavenum = [];
            scope.arr_leavelist = [];

            holidayFactory.getCurrentQuarterDetails().then(function(response) {
                scope.getleavelist = response;
                scope.updateval = updateChart(scope.getleavelist);
                bindData();
            });

            function updateChart(details)
            {
                var a1start, a1end, a1b1text, a1b2text, a1b1color, a1b1start, a1b1end, a1b2color, a1b2start, a1b2end;
                var a2start, a2end, a2b1text, a2b2text, a2b1color, a2b1start, a2b1end, a2b2color, a2b2start, a2b2end;
                if(details[3] < 0 && details[6] < 0)
                {
                    a1b1text = "Negative Balance Leave";
                    a1b2text = "";

                    a2b1text = "";
                    a2b2text = "Negative Carryforward Leave";
                    a1start = details[6];
                    a2start = details[6];
                    a1end  = details[5];
                    a2end  = details[5];

                    a1b1color = "black";
                    a1b1start = details[6];
                    a1b1end = 0;

                    a1b2color = "#FFF";
                    a1b2start = 0;
                    a1b2end = details[5];

                    a2b1color = "#FFF";
                    a2b1start = details[6];
                    a2b1end = details[3]+details[5];

                    a2b2color = "black";
                    a2b2start = details[3]+details[5];
                    a2b2end = details[5];
                }
                else if(details[3] < 0)
                {
                    a1b1text = "Balance Leave";
                    a1b2text = "";

                    a2b1text = "";
                    a2b2text = "Negative Carryforward Leave";
                    a1start = 0;
                    a2start = 0;
                    a1end  = details[5];
                    a2end  = details[5];

                    a1b1color = "green";
                    a1b1start = 0;
                    a1b1end = details[6];

                    a1b2color = "#FFF";
                    a1b2start = details[6];
                    a1b2end = details[5];
                    
                    a2b1color = "#FFF";
                    a2b1start = 0;
                    a2b1end = details[3]+details[5];

                    a2b2color = "black";
                    a2b2start = details[3]+details[5];
                    a2b2end = details[5];
                }
                else if(details[6] < 0)
                {
                    a1b1text = "Balance Leave";
                    a1b2text = "";

                    a2b1text = "Accured Leave";
                    a2b2text = "";
                    a1start = details[6];
                    a2start = details[6];
                    a1end  = details[5] + details[3];
                    a2end  = details[5] + details[3];
                    a1b1color = "black";
                    a1b1start = details[6];
                    a1b1end = 0;

                    a1b2color = "#FFF";
                    a1b2start = 0;
                    a1b2end = details[6] + details[4];
                   
                    a2b1color = "orange";
                    a2b1start = 0;
                    a2b1end = details[5];

                    a2b2color = "yellow";
                    a2b2start = details[5];
                    a2b2end = details[5] + details[3];
                }
                else
                {
                    a1b1text = "Balance Leave";
                    a1b2text = "Availed Leave";

                    a2b1text = "Accured Leaves";
                    a2b2text = "Carryforward Leaves";

                    a1start = 0;
                    a2start = 0;
                    a1end  = details[5] + details[3];
                    a2end  = details[5] + details[3];
                    a1b1color = "green";
                    a1b1start = 0;
                    a1b1end = details[6];
                    
                    a1b2color = "red";
                    a1b2start = details[6];
                    a1b2end = details[6] + details[4];

                    a2b1color = "orange";
                    a2b1start = 0;
                    a2b1end = details[5];

                    a2b2color = "yellow";
                    a2b2start = details[5];
                    a2b2end = details[5] + details[3];
                }
                var arrupdate = {
                    "a1b1text"  : a1b1text,
                    "a1b2text"  : a1b2text,
                    "a2b1text"  : a2b1text,
                    "a2b2text"  : a2b2text,
                    "a1b1text"  : a1b1text,
                    "a1start"   : a1start,
                    "a2start"   : a2start,
                    "a1end"     : a1end,
                    "a2end"     : a2end,
                    "a1b1color" : a1b1color,
                    "a1b1start" : a1b1start,
                    "a1b1end"   : a1b1end,
                    "a1b2color" : a1b2color,
                    "a1b2start" : a1b2start,
                    "a1b2end"   : a1b2end,
                    "a2b1color" : a2b1color,
                    "a2b1start" : a2b1start,
                    "a2b1end"   : a2b1end,
                    "a2b2color" : a2b2color,
                    "a2b2start" : a2b2start,
                    "a2b2end"   : a2b2end
                };
                return arrupdate;
            }

            function bindData() {
                var gaugeChart = AmCharts.makeChart("chart_container", {
                    "type": "gauge",
                    "theme": "light",
                    "axes": [{
                        "bottomTextYOffset": -106,
                        "startAngle": -90,
                        "endAngle": 90,
                        "radius": "80%",
                        "axisThickness": 1,
                        "valueInterval": 1,
                        "axisColor": "#000",
                        "bands": [
                            {
                                "alpha": 0.2,
                                "balloonText": scope.updateval.a1b1text,
                                "color": scope.updateval.a1b1color,
                                "startValue": scope.updateval.a1b1start,
                                "endValue": scope.updateval.a1b1end,
                                "innerRadius": "85%",
                                "radius": "99%",
                            },
                            {
                                "balloonText": scope.updateval.a1b2text,
                                "color": scope.updateval.a1b2color,
                                "startValue": scope.updateval.a1b2start,
                                "endValue": scope.updateval.a1b2end,
                                "innerRadius": "85%",
                                "radius": "99%",
                            }
                        ],
                        "endValue": scope.updateval.a1end,
                        "startValue": scope.updateval.a1start,
                    },
                    {
                        "startAngle": -90,
                        "endAngle": 90,
                        "axisColor": "#000",
                        "axisThickness": 1,
                        "endValue": scope.updateval.a2end,
                        "startValue":  scope.updateval.a2start,
                        "radius": "60%",
                        "valueInterval": 1,
                        "bands": [
                            {
                                "balloonText": scope.updateval.a2b1text,
                                "color": scope.updateval.a2b1color,
                                "startValue": scope.updateval.a2b1start,
                                "endValue": scope.updateval.a2b1end,
                                "innerRadius": "90%",
                                "radius": "99%",
                            },
                            {
                                "balloonText": scope.updateval.a2b2text,
                                "color": scope.updateval.a2b2color,
                                "startValue": scope.updateval.a2b2start,
                                "endValue": scope.updateval.a2b2end,
                                "innerRadius": "90%",
                                "radius": "99%",
                            }
                        ]

                      }],
                    "arrows": [{
                        "innerRadius": "5%",
                        "radius": "90%",
                    }]
                });
                
                setInterval(randomValue, 2000);

                // set random value
                function randomValue() {
                    var value = scope.getleavelist[6];
                    if (gaugeChart) {
                        if (gaugeChart.arrows) {
                            if (gaugeChart.arrows[0]) {
                                if (gaugeChart.arrows[0].setValue) {
                                    gaugeChart.arrows[0].setValue(value);
                                    gaugeChart.axes[0].setBottomText(value + "Balance");
                                }
                            }
                        }                       
                    }
                }
            }
        }
    }
});

app.directive('hover', ['$compile','$interpolate', function($compile,$interpolate){
  return{
    restrict: 'C',
    link: function(scope,element,attrs){
      scope.myTooltip = function() {
        var content = $(element).find('.tooltip-content');
        return $interpolate(content.html())(scope);
      };
    }
  }
}]);

app.directive('ngConfirmClick',  function() {
    return {
      priority: 1,
      link: function(scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.ngClick;
        attr.ngClick = "";
        element.bind('click', function(event) {
          if (window.confirm(msg)) {
            scope.$eval(clickAction)
          }
        });
      }
    };
  }
)