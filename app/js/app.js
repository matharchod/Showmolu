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

function Flickolu() {
  var flickrPhotoGroup = [];
  $.ajax({
    url: '/app/js/flickr-photos.json',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data.photos.photo);  
      for (var i in data.photos.photo) {
        var flickrPhoto = data.photos.photo[i]
        , owner = flickrPhoto.owner// owner ID
        , farmid = flickrPhoto.farm// farm ID
        , id = flickrPhoto.id// image ID
        , secret = flickrPhoto.secret// secret
        , serverid = flickrPhoto.server// server ID
        , title = flickrPhoto.title;// title
        //console.log(owner,farmid,id,secret,serverid,title);   
        //create image index
        var imageIndex = [];
        imageIndex.push(i);
        //console.log('imageIndex :', imageIndex);
        //create image url
        var imageLink = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg';
        //console.log('image url :', imageLink);
        //create image link
        var imageURL = 'https://www.flickr.com/photos/' + owner + '/' + id;
        //add to flickrPhotoGroup object
        flickrPhotoGroup.push([imageIndex[0],imageLink,title,imageURL]);
      }
      createCarousel(flickrPhotoGroup); //create the bkg carousel
    }
  });


};

function createCarousel(flickrPhotoGroup) {
  for (var i in flickrPhotoGroup) {
    console.log(flickrPhotoGroup[i]);
  } 
}