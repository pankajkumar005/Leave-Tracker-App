'use strict';

describe('Directive: commonDirectives', function () {

  // load the directive's module and view
  beforeEach(module('leaveTrackerAppApp'));
  beforeEach(module('app/directives/commonDirectives/commonDirectives.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<common-directives></common-directives>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the commonDirectives directive');
  }));
});
