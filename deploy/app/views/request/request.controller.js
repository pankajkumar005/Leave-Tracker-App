'use strict';

angular.module('leaveTrackerAppApp')
  .controller('RequestCtrl', function ($scope, holidayFactory, $location, $localstorage, $modal, $log) {
    $scope.message = 'Hello';
     holidayFactory.getRequestDetails().then(function(response) {
        $scope.getRequestDetails = response;
    });
     localStorage.removeItem('approval');
     var approveRecord = $localstorage.getObject('uprecord') || [];
     $localstorage.setObject('approval', approveRecord);
      var approveRecord = JSON.parse(localStorage.approval); 
            var appliedRecord = [];
            angular.forEach(approveRecord, function(value, key) {
                if(value.status == 'APPLIED')
                {
                   this.push(value);
                }
                
            }, appliedRecord);
          
    	localStorage.approval = JSON.stringify(appliedRecord);
	
 	if(localStorage.approval)
	var approvalrecordobj = JSON.parse(localStorage.approval); 
	console.log('$scope.wfhTeamRecord', approvalrecordobj);
	var candidateName = [];
	angular.forEach(approvalrecordobj, function(value, key) {
	    	this.push(value);
	}, candidateName);
	console.log("log", candidateName);
	$scope.log = candidateName;
	
    $scope.approve = function(productIndex, recordid) {
       var updaterecord = JSON.parse(localStorage.uprecord); 
            var arrlog = [];
            angular.forEach(updaterecord, function(value, key) {
                if(value.leaveRecordId == recordid)
                {
                    value.status = 'APPROVE';
                }
                this.push(value);
            }, arrlog);
          
    	localStorage.uprecord = JSON.stringify(arrlog);
        $scope.log.splice(productIndex, 1);
    }

    $scope.rejectmodal = function(productIndex, leaveRecord) {
            var templateUrl = 'rejectmodal.html';
            var controller = 'ModalInstanceCtrl';

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: templateUrl,
                size: 'sm',
                controller: controller,
                resolve: {
                    leaveRecordId: function(){
                      return leaveRecord;
                    },
                    index: function(){
                      return productIndex;
                    },
                    log: function(){
                      return $scope.log;
                    }

                }
            });

            modalInstance.result.then(function(selectedItem) {}, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
});
angular.module('leaveTrackerAppApp')
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, leaveRecordId, index, log) {

 $scope.reject = function() {
       var updaterecord = JSON.parse(localStorage.uprecord); 
            var arrlog = [];
            angular.forEach(updaterecord, function(value, key) {
                if(value.leaveRecordId == leaveRecordId)
                {
                    value.status = 'REJECT';
                }
                this.push(value);
            }, arrlog);
          
    	localStorage.uprecord = JSON.stringify(arrlog);
        console.log("productIndex", index);
        log.splice(index, 1);
    	$scope.cancel();
    }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});