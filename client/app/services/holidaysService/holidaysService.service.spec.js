'use strict';

describe('Service: holidaysService', function () {

  // load the service's module
  beforeEach(module('leaveTrackerAppApp'));

  // instantiate service
  var holidaysService;
  beforeEach(inject(function (_holidaysService_) {
    holidaysService = _holidaysService_;
  }));

  it('should do something', function () {
    expect(!!holidaysService).toBe(true);
  });

});
