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
  //create flickrPhotoGroup object
  var flickrPhotoGroup = [];
  $.ajax({
    url: '/app/js/flickr-photos.json',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data.photos.photo);  
      for (var i in data.photoset.photo) {
        var flickrPhoto = data.photoset.photo[i]
        , owner = flickrPhoto.owner// owner ID
        , farmid = flickrPhoto.farm// farm ID
        , id = flickrPhoto.id// image ID
        , secret = flickrPhoto.secret// secret
        , serverid = flickrPhoto.server// server ID
        , title = flickrPhoto.title;// title
        //create image url
        var imageLink = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_b.jpg';
        //create image link
        var imageURL = 'https://www.flickr.com/photos/' + owner + '/' + id;
        //add to flickrPhotoGroup object
        flickrPhotoGroup.push({'imageLink':imageLink,'title':title,'imageURL':imageURL});
      }
      var idx = 1;
      createBkgImg(flickrPhotoGroup,idx); //create the bkg image and menu
      //add event listeners for prev/next btns
      $('.prev').click(function(){
        createBkgImg(flickrPhotoGroup,idx--);
      });
       $('.next').click(function(){
        createBkgImg(flickrPhotoGroup,idx++);
      });     
    }
  });


};

function createBkgImg(flickrPhotoGroup,idx) {
  if (idx < 0 || idx > flickrPhotoGroup.length){
    idx = 0;
  } 
  var bkgImage = flickrPhotoGroup[idx];
  $('#dynamicBkg').css('background-image','url(' + bkgImage.imageLink + ')');
  $('#dynamicBkg .menu .title').html(bkgImage.title)
  $('#dynamicBkg .menu .link a').attr('href',bkgImage.imageURL);
}
