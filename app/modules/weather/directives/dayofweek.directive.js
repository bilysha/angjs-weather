angular.module('weather')

  .directive('day',function(){
    return {
      resctrict: 'E',
      scope: {
        day: '=',
        convert: '&'
      },
      controller: function($scope) {
        $scope.day.time = (new Date(+($scope.day.time + '000'))).toString().slice(4,10);
        $scope.day.temperatureLow = $scope.convert({ 'x' : $scope.day.temperatureLow });
        $scope.day.temperatureHigh = $scope.convert({ 'x' : $scope.day.temperatureHigh });
      },
      templateUrl: 'modules/weather/templates/dayofweek.html'
    };
  });
