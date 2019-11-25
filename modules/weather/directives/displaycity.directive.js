angular.module('weather')
  .directive('displayCity',['addedCities', 'constants', function(addedCities, constants){
    return {
      restrict: 'E',
      scope: {
        item: '=',
        index: '@'
      },
      templateUrl: 'modules/weather/templates/displaycity.html',
      controller: function($scope) {
        if (Object.keys($scope.item).length === 1) {
          $scope.empty = true;
        }
        else {
          $scope.empty = false;
        }
        $scope.name = constants.items[$scope.index].city;
      },
      link: function(scope) {

        var deleting = false;

        scope.delete = function() {
          if(!deleting) {
            deleting = true;
            document.getElementsByClassName('city-container')[scope.index].classList.add('deleting');
            setTimeout(function() {
              addedCities.deleteCity(scope.index);
              scope.$apply();
              deleting = false;
            }, 500);
          }
        };

      }
    };
  }]);
