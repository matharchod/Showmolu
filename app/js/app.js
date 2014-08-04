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
      var idx = randomIntFromInterval(1, flickrPhotoGroup.length);
      console.log('idx',idx);
      sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(flickrPhotoGroup));
      console.log('sessionStorage', JSON.parse(sessionStorage.getItem('flickrPhotoGroup')));      
      createBkgImg(flickrPhotoGroup,idx); //create the bkg image and menu
      //add event listeners for prev/next btns
      $('.prev').click(function(){
        console.log('next',idx);
        createBkgImg(flickrPhotoGroup,idx--);
      });
      $('.next').click(function(){
        console.log('next',idx);       
        createBkgImg(flickrPhotoGroup,idx++);
      });     
    }
  });
};

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

function createBkgImg(flickrPhotoGroup,idx) {
  if (idx <= 0) { //beginning of object
    idx = 1;
    $('.prev').hide(); //hide prev btn
  } else if (idx >= flickrPhotoGroup.length){ //end of object
    $('.next').hide(); //hide next btn
  } else {
    var bkgImage = flickrPhotoGroup[idx];
    $('#dynamicBkg').css('background-image','url(' + bkgImage.imageLink + ')');
    $('#dynamicBkg .menu .title').html(bkgImage.title)
    $('#dynamicBkg .menu .link a').attr('href',bkgImage.imageURL);  
    $('.prev, .next').show();  
  }
}

function bkgControlsInit(flickrPhotoGroup,idx) {
  createBkgImg(flickrPhotoGroup,idx); //create the bkg image and menu
  //add event listeners for prev/next btns
  $('.prev').click(function(){
    console.log('prev',idx);
    createBkgImg(flickrPhotoGroup,idx--);
  });
   $('.next').click(function(){
    console.log('next',idx);
    createBkgImg(flickrPhotoGroup,idx++);
  }); 
}
