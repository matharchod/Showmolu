'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'pageController'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'pageController'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

function ShowmoluFlickr() {
  $.ajax({
    url: '/app/js/flickr-photos.json',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data.photos.photo);  
      var i;
      for (i in data.photos.photo) {
        var owner = data.photos.photo[i].owner;// owner ID
        var farm = data.photos.photo[i].farm;// farm ID
        var id = data.photos.photo[i].id;// image ID
        var secret = data.photos.photo[i].secret;// secret
        var server = data.photos.photo[i].server;// server ID
        var title = data.photos.photo[i].title;// title
        console.log(owner,farm,id,secret,server,title);        
      }
    }
  });
};