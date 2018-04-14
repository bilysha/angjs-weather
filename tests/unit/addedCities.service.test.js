describe('Test addedCities service', function() {
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

  beforeEach(function () {
    module('weather');
    suite = {};
    inject(function($injector) {
        suite.service = $injector.get('addedCities');
    });
  });

  afterEach(function () {
    suite = null;
  });

  it('should return empty array', function() {
    suite.cities = suite.service.getCities();
    suite.isEmpty = suite.service.getLength();
    expect(suite.cities).toEqual([]);
    expect(suite.isEmpty).toEqual(true);
  });

  it('should add cities to array', function() {
    suite.service.addCity(cityObject('europe/Minsk', 43, 40));
    suite.service.addCity(cityObject('europe/London', 43, 40));
    suite.cities = suite.service.getCities();
    suite.isEmpty = suite.service.getLength();
    expect(suite.cities.length).toEqual(2);
    expect(suite.isEmpty).toEqual(false);
  });

  it('should transform city timezone', function() {
    suite.service.addCity(cityObject('europe/Minsk', 43, 40));
    suite.service.addCity(cityObject('asdjkhkk23r/New_York', 43, 40));
    suite.cities = suite.service.getCities();
    suite.isEmpty = suite.service.getLength();
    expect(suite.cities[0].timezone).toEqual('Minsk');
    expect(suite.cities[1].timezone).toEqual('New York');
    expect(suite.isEmpty).toEqual(false);
  });

  it('should delete city from array', function() {
    suite.service.addCity(cityObject('europe/Minsk', 43, 40));
    suite.service.addCity(cityObject('europe/London', 43, 40));
    suite.service.addCity(cityObject('europe/Berezino', 43, 40));
    suite.service.deleteCity(2);
    suite.service.deleteCity(0);
    suite.cities = suite.service.getCities();
    suite.isEmpty = suite.service.getLength();
    expect(suite.cities.length).toEqual(1);
  });

})
