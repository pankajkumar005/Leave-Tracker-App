'use strict';

angular.module('leaveTrackerAppApp')
  .controller('HistoryCtrl', function ($scope, holidayFactory, $localstorage) {
    $scope.message = 'Hello';
    $scope.bject = function(arr) {
       	 var rv = {};
		  for (var i = 0; i < arr.length; ++i)
		    rv = arr[i];
		  return rv;
        };

  	if (localStorage.getItem('histroy') == null) {
	     holidayFactory.getHistoryDetails().then(function(response) {
	        console.log(response);
	        $scope.record = response;
	        $localstorage.setObject('histroy', $scope.record);
	    });
 	}
 	else
	{
		// console.log("elsel");
	 //      var upRecord = $localstorage.getObject('uprecord') || [];
	 //      var histroyRecord = $localstorage.getObject('histroy') || [];
  //    		if(localStorage.getItem('uprecord') != null)
  //          {
	 //            var appliedRecord = [];
	 //            angular.forEach(upRecord, function(value, key) {
	 //                if(value.status != 'APPLIED')
	 //                {
	 //                   this.push(value);
	 //                }
	 //            }, appliedRecord);
	 //            if(appliedRecord.length)
  //           	{
		//             console.log("appliedRecord", appliedRecord);
		//             console.log("histroyRecord", histroyRecord);
		//             var obj = $scope.bject(appliedRecord);
		//             console.log(obj);
	 //       		    histroyRecord.push(obj);
		//            console.log("histroyRecordFTER", histroyRecord);
  //          		$localstorage.setObject('histroy', histroyRecord);
  //      			}
  //         	}
            $scope.record = $localstorage.getObject('histroy');
	}
	
  });

