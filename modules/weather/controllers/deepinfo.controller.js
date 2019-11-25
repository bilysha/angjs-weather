angular.module('weather').
  controller('deepinfoCtrl', ['$scope', '$routeParams', 'addedCities', function($scope, $routeParams, addedCities) {
    $scope.item = addedCities.getCity($routeParams.timezone);
    $scope.labels = [];
    $scope.temperatureDataset = [];
    $scope.humidityDataset = [];
    $scope.windDataset = [];
    $scope.convert = addedCities.convertTemperature;
    $scope.label = 'Temperature °C';

    function normalize(str) {
      var newStr = $scope.convert(parseInt(str.match(/\d{1,3}°F/)));
      return str.replace(/\d{1,3}°F/, newStr + '°C');
    }

    $scope.item.daily.summary = normalize($scope.item.daily.summary);
    for(var i = 0; i < 25; i += 2) {
      $scope.labels.push((new Date(+($scope.item.hourly.data[i].time + '000'))).toString().slice(16,21));
      $scope.temperatureDataset.push($scope.convert($scope.item.hourly.data[i].temperature));
      $scope.humidityDataset.push(Math.floor($scope.item.hourly.data[i].humidity * 100));
      $scope.windDataset.push($scope.item.hourly.data[i].windSpeed);
    }

    $scope.shared = $scope.temperatureDataset;
    setTimeout(display, 0);

    function display(){
      let myChart = document.getElementById('myChart').getContext('2d');
      $scope.chart = new Chart(myChart, {
        type: 'line',
        data: {
          labels: $scope.labels,
          datasets: [{
            label: $scope.label,
            data: $scope.shared,
            backgroundColor: 'rgba(0, 0, 0,0.2)',
            borderColor: '#282121'
          }]
        },
        options: {}
    });
    }

    $scope.selectGraph = function(prop) {
      if(prop === 'temperature') {
        $scope.shared = $scope.temperatureDataset;
        $scope.label = 'Temperature °C';
      }
      else if(prop === 'humidity') {
        $scope.shared = $scope.humidityDataset;
        $scope.label = 'Humidity %';
      }
      else {
        $scope.shared = $scope.windDataset;
        $scope.label = 'Wind km/h';
      }
      display();
    };

  }]);
