'use strict';

describe('Directive: leavetype', function () {

  // load the directive's module and view
  beforeEach(module('leaveTrackerAppApp'));
  beforeEach(module('app/directives/leavetype/leavetype.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<leavetype></leavetype>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the leavetype directive');
  }));
});