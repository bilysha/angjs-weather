angular.module('weather', ['ngRoute']);

angular.module('weather')
  .config(function($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'modules/weather/templates/home.html'
        })
        .when('/info/:timezone', {
          templateUrl: 'modules/weather/templates/info.html',
          controller: 'deepinfoCtrl'
        });
});

angular.module('weather')
  .run(['constants', 'addedCities', 'request', function(constants, addedCities, request) {
    for(let i = 0; i < constants.items.length; i++) {
      addedCities.addCity({});
      setTimeout(function() {
        request.get(constants.items[i].cords, i);
      }, 0);
    }
  }]);
