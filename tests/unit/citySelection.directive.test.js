describe('Directive citySelection unit testing', function() {

  var suite = null;

  beforeEach(module('weather'));

  beforeEach(inject(function($compile, $rootScope, $httpBackend, $controller) {
    suite = {};
    suite.template = '<form ng-submit="addCity(role)">'+
                          'Choose city :'+
                          '<select ng-model="role">'+
                            '<option ng-repeat="item in constants.items" value="{{item.city}}">{{item.city}}</option>'+
                          '</select>'+
                          '<input type="submit" value="Add">'+
                      '</form>'+
                      '<p ng-show="show" class="nothing-to-show">There is nothing to show! Try to add a city.</p>';
    suite.scope = $rootScope.$new();
    $controller('citySelectionCtrl', {$scope: suite.scope});
    $httpBackend.whenGET('modules/weather/templates/cityselection.html').respond(suite.template);
    suite.element = angular.element('<city-selection constants="constants" role="role" add-city-view="addCityView(c)"></city-selection>');
    suite.element = $compile(suite.element)(suite.scope);
    $httpBackend.flush();
    suite.scope.$digest();
  }));

  afterEach(function() {
    suite.scope.$destroy();
    suite = null;
  });

  it('should repace ng-repeat with approcsimante content', function() {
    expect(suite.element.html()).toContain('Minsk');
    expect(suite.element.html()).toContain('Dublin');
    expect(suite.element.html()).toContain('Lisbon');
    expect(suite.element.html()).toContain('New York');
  });

});
