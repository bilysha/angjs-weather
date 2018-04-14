angular.module('weather')
  .controller('citySelectionCtrl', [
    '$scope',
    'addedCities',
    'constants',
    function(
      $scope,
      addedCities,
      constants
    ) {
      $scope.constants = constants;
      $scope.citiesList = addedCities.getCities();
    }
  ]);
