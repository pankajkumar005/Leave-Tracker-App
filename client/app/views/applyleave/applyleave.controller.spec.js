'use strict';

describe('Controller: ApplyleaveCtrl', function () {

  // load the controller's module
  beforeEach(module('leaveTrackerAppApp'));

  var ApplyleaveCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApplyleaveCtrl = $controller('ApplyleaveCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
