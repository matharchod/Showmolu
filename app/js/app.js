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
      for (var i in data.photos.photo) {
        var owner = data.photos.photo[i].owner;// owner ID
        var farmid = data.photos.photo[i].farm;// farm ID
        var id = data.photos.photo[i].id;// image ID
        var secret = data.photos.photo[i].secret;// secret
        var serverid = data.photos.photo[i].server;// server ID
        var title = data.photos.photo[i].title;// title
        console.log(owner,farmid,id,secret,serverid,title);   
        //create image index
        var imageIndex = [];
        imageIndex.push(i);
        console.log('imageIndex :', imageIndex);
        //create image url
        var y = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg';
        console.log('image url :', y);
        //create image title
        //create image link
        //      
      }
    }
  });
};