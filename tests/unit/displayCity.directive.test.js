describe('Directive display city directive tests', function() {

  var suite = null;

  var cityObject = function(a,b,c) {
    return {
      timezone: a,
      currently: {
        temperature : b ,
        apparentTemperature: c
      }
    };
  };

  beforeEach(module('weather'));

  beforeEach(inject(function($compile, $rootScope, $httpBackend, $controller) {
    suite = {};
    suite.template = '<div class="city-container">'+
                      '<div>'+
                        '<div class="timezone-information">'+
                          '<p>{{item.timezone}}</p>'+
                          '<p>{{item.currently.summary}}</p>'+
                        '</div>'+
                        '<div class="current-weather">'+
                          '<img ng-src="resourses/images/{{item.currently.icon}}.png">'+
                          '<div class="temperature">'+
                            '<p class="current-temperature">{{item.currently.temperature}} &deg;C</p>'+
                            '<p>feel like {{item.currently.apparentTemperature}} &deg;C</p>'+
                          '</div>'+
                          '<div class="additional-information">'+
                            '<p>Precipitation : {{item.currently.precipProbability}} %</p>'+
                            '<p>Humidity : {{item.currently.humidity}} %</p>'+
                            '<p>Wind : {{item.currently.windSpeed}} km/h</p>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<div>'+
                        '<button ng-click="delete($index)">&#10006;</button>'+
                      '</div>'+
                    '</div>';

    suite.scope = $rootScope.$new();
    $controller('citySelectionCtrl', {$scope: suite.scope});
    suite.scope.addedCities.addCity(cityObject('europe/Minsk', 43, 40));
    suite.scope.addedCities.addCity(cityObject('europe/Pinsk', 43, 40));
    suite.scope.citiesList = suite.scope.addedCities.getCities();
    console.log(suite.scope.citiesList);
    $httpBackend.whenGET('modules/weather/templates/displaycity.html').respond(suite.template);
    suite.element = angular.element('<display-city  item="item"></display-city>');
    suite.element = $compile(suite.element)(suite.scope);
    $httpBackend.flush();
    suite.scope.$digest();
  }));

  afterEach(function() {
    suite.scope.$destroy();
    suite = null;
  });

  it('should repace ng-repeat with approcsimate content', function() {
    console.log(suite.element);
  });

});
