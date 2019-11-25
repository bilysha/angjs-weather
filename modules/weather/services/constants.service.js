angular.module('weather').
  constant('constants', {
    items : [{
      city: 'Minsk',
      cords: '53.9,27.56667'
    },{
      city: 'Berezino',
      cords: '53.83256305,28.99096489'
    },{
      city: 'Mikhalevo',
      cords: '53.70203214,28.93626264'
    },{
      city: 'Vaykavusk',
      cords: '53.1516417,24.4422029'
    }],
    url : 'https://api.darksky.net/forecast/' ,
    token : '216003fd9aebe5231a3b062fb1949d8a/',
    urlCallback : '?format=jsonp&callback=JSON_CALLBACK'
  });
