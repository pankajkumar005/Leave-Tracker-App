'use strict';

describe('Service: leaveService', function () {

  // load the service's module
  beforeEach(module('leaveTrackerAppApp'));

  // instantiate service
  var leaveService;
  beforeEach(inject(function (_leaveService_) {
    leaveService = _leaveService_;
  }));

  it('should do something', function () {
    expect(!!leaveService).toBe(true);
  });

});
