'use strict';

angular.module('leaveTrackerAppApp')
  .directive('linechart', function (holidayFactory) {
    return {
      template: '<div id="linechar" style="margin: 0 auto">not working</div>',
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {
        	holidayFactory.getTeamHistoryDetails().then(function(response) {
            	scope.record = response;

        	});
        	function getmonth(month, num)
			{
				var montharray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				if(num === 'string')
				{
					return montharray.indexOf(month);
				}
				else
				{
					return montharray[month.slice(1,2)-1];
				}
				
			}	
        	var today = new Date().toJSON().slice(0,10);
			var tsplit = today.split("-");
			var finaldate = getmonth(tsplit[1], "num")+"-"+tsplit[2]+"-"+tsplit[0]; 
        	var enddate =  new Date();
			enddate.setMonth(enddate.getMonth() + 2);
			var endslice = enddate.toJSON().slice(0,10);
			var esplit = endslice.split("-");
			var finalenddate = getmonth(esplit[1], "num")+"-"+esplit[2]+"-"+esplit[0];

    		var filterData  = {
        			'fDate': finaldate,
        			'tDate': finalenddate,
        		};
        	scope.update = function(){
        		var filterData  = {
        			'fDate': scope.fmDate,
        			'tDate': scope.tDate,
        		};
        		drawChart(filterData);
        		return false;
        	};
        	console.log(filterData);
      			drawChart(filterData);
	    	function drawChart(filterdata)
	    	{
    			var chartData = generateChartData(filterdata);
				var chart = AmCharts.makeChart("linechar", {
				    "type": "serial",
				    "theme": "light",
				    "marginRight": 80,
				    "autoMarginOffset": 20,
				    "marginTop": 7,
				    "dataProvider": chartData,
				    "valueAxes": [{
				        "axisAlpha": 0.2,
				        "dashLength": 1,
				        "position": "left"
				    }],
				    "mouseWheelZoomEnabled": true,
				    "graphs": [{
				        "id": "g1",
				        "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>value: [[value]]</span></b>",
				        "bullet": "round",
				        "bulletBorderAlpha": 1,
				        "bulletColor": "#FFFFFF",
				        "hideBulletsCount": 50,
				        "title": "red line",
				        "valueField": "visits",
				        "useLineColorForBulletBorder": true
				    }],
				    "categoryField": "date",
				    "categoryAxis": {
				        "parseDates": true,
				        "axisColor": "#DADADA",
				        "dashLength": 1,
				        "minorGridEnabled": true,
				        // "startOnAxis": true
				    },
				});

				chart.addListener("rendered", zoomChart);
				zoomChart();

				// this method is called when chart is first inited as we listen for "dataUpdated" event
				function zoomChart() {
				    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
				    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
				}

				// generate some random data, quite different range
				function generateChartData(filterdata) {
					var startDate = filterdata.fDate;
					var strSplit = startDate.split("-");
					strSplit[0] = getmonth(strSplit[0], "string");
					var endDate = filterdata.tDate;
					var endSplit = endDate.split("-");
					endSplit[0] = getmonth(endSplit[0], "string");
				    var chartData = [];
				    var firstDate = new Date(strSplit[2], strSplit[0], strSplit[1]);
				    var secondDate = new Date(endSplit[2], endSplit[0], endSplit[1]);
				    var timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
					var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

				    for (var i = 0; i < diffDays; i++) {
				        // we create date objects here. In your data, you can have date strings
				        // and then set format of your dates using chart.dataDateFormat property,
				        // however when possible, use date objects, as this will speed up chart rendering.
				        var newDate = new Date(firstDate);
				        // console.log("newDate", newDate);
				        newDate.setDate(newDate.getDate() + i);

				        var visits = Math.round(Math.random() * (30));

				        chartData.push({
				            date: newDate,
				            visits: visits
				        });
				    }
				    return chartData;
				}

				
	    		
			}
		}
	}
});