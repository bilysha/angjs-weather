describe('testing city selection controller', function() {

  var suite = null;

  beforeEach(module('weather'));

  beforeEach(function () {
    suite = {};
    suite.scope = {};
  });

  beforeEach(inject(function($controller) {
    $controller('citySelectionCtrl', {$scope: suite.scope});
  }));

  afterEach(function () {
    suite = null;
  });

  it('should set role to cities[0]', function() {
    expect(suite.scope.role).toBe('Minsk');
  });

});
