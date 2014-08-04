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

var Flickoluser = {
  getFlickrPhotoGroup : function(){
    return JSON.parse(sessionStorage.getItem('flickrPhotoGroup'));
  }
}

function Flickolu() {
  //create flickrPhotoGroup object
  var flickrPhotoGroup = [];
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0003a7066dc8122b2dff6740652b722a&photoset_id=72157645741266837&format=json&nojsoncallback=1',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      for (var i in data.photoset.photo) {
        var flickrPhoto = data.photoset.photo[i]
        , owner = '94139373@N05' // owner ID
        , imageSet = '72157645741266837' // gallery ID
        , farmid = flickrPhoto.farm// farm ID
        , id = flickrPhoto.id// image ID
        , secret = flickrPhoto.secret// secret
        , serverid = flickrPhoto.server// server ID
        , title = flickrPhoto.title;// title
        //create image url
        var imageLink = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_b.jpg';
        //create image link
        //var imageURL = 'https://www.flickr.com/photos/' + owner + '/' + id; //photostream
        var imageURL = 'https://www.flickr.com/photos/' + owner + '/' + id + '/in/set-' + imageSet;
        //add to flickrPhotoGroup object
        flickrPhotoGroup.push({'imageLink':imageLink,'title':title,'imageURL':imageURL});
      }
      //init bkg image and controls
      var idx = randomIntFromInterval(1, flickrPhotoGroup.length -1);
      console.log('idx',idx);
      //adding session storage for json
      if (JSON.parse(sessionStorage.getItem('flickrPhotoGroup')) == null) {
         sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(flickrPhotoGroup));       
      }
     // var y = JSON.parse(sessionStorage.getItem('flickrPhotoGroup'));
      bkgControlsInit(flickrPhotoGroup,idx) 
      //console.log('sessionStorage', JSON.parse(sessionStorage.getItem('flickrPhotoGroup')));    
    }
  });
};

      //console.log('sessionStorage', JSON.parse(sessionStorage.getItem('flickrPhotoGroup')));  

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

function createBkgImg(flickrPhotoGroup,idx) {
  if (idx <= 0) { //beginning of object
    idx = 1;
    $('.prev').hide(); //hide prev btn
  } else if (idx == flickrPhotoGroup.length){ //end of object
    idx = flickrPhotoGroup.length--;
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
    console.log('next',idx);
    createBkgImg(flickrPhotoGroup,idx--);
  });
  $('.next').click(function(){
    console.log('next',idx);       
    createBkgImg(flickrPhotoGroup,idx++);
  });
}
