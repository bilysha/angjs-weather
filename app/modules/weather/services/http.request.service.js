angular.module('weather')
  .service('request', [
    '$http',
    '$q',
    'constants',
    'addedCities',
    function(
      $http,
      $q,
      constants,
      addedCities
    ) {
      this.inProgress = false;
      var request = this;

      this.get = function(cords, index) {
        var time = Date.now();
        request.inProgress = true;
        this.getCity(cords)
          .then(function(result) {
            addedCities.addCity(result, index);
          })
          .catch(function(msg) {
            console.error(msg);
          })
          .finally(function() {
            request.inProgress = false;
            var elapsedTime = Date.now() - time;
            console.log('request ends in -> ' + elapsedTime + ' ms');
          });
      };

      this.getCity = function(cords) {
        var q = $q.defer();
        $http.jsonp(constants.url + constants.token + cords + constants.urlCallback)
          .then(function(response) {
            console.log(response);
            if(response.status === 200) {
              q.resolve(response.data);
            }
            else {
              q.reject(response.status);
            }
          });
        return q.promise;
      };
  }]);

