angular.module('weather')
  .factory('addedCities', ['constants', function(constants) {
    var cities = [];
    var isEmpty = true;

    this.convertTemperature = function(temp) {
      return Math.floor((temp -32) * 5 / 9);
    }

    this.getCity = function(timezone) {
      for(var i = 0; i < cities.length; i++) {
        if(cities[i].timezone === timezone) {
          return cities[i];
        }
      }
    };

    this.getCities = function() {
      return cities;
    };

    this.getLength = function() {
      return isEmpty;
    };

    this.addCity = function(obj, index) {
      if (Object.keys(obj).length !== 0) {
        obj.timezone = constants.items[index].city;
        obj.currently.humidity = Math.floor(obj.currently.humidity * 100);
        obj.currently.time = new Date(+(obj.currently.time + '000'));
        obj.currently.temperature = this.convertTemperature(obj.currently.temperature);
        obj.currently.apparentTemperature = this.convertTemperature(obj.currently.apparentTemperature);
        if(index === undefined) {
          cities.push(obj);
        }
        else {
          cities.splice(index, 1, obj);
        }
        isEmpty = false;
      }
      else {
        cities.push(obj);
        isEmpty = false;
      }
    };

    return {
      getCities: this.getCities,
      addCity: this.addCity,
      getLength: this.getLength,
      getCity: this.getCity,
      convertTemperature: this.convertTemperature
    };
  }]);
