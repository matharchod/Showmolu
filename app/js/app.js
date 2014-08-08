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

//Test for Flickolu object
var Flickoluser = {
  //create flickrPhotoGroup object
  photoGroup : function(flickrData){
    var flickrPhotoGroup = [];  
    for (var i in flickrData.photoset.photo) {
      var flickrPhoto = flickrData.photoset.photo[i]
      , owner = '94139373@N05' // owner ID
      , imageSet = 72157645741266837 // gallery ID, must be integer, not string
      , farmid = flickrPhoto.farm// farm ID
      , id = flickrPhoto.id// image ID
      , secret = flickrPhoto.secret// secret
      , serverid = flickrPhoto.server// server ID
      , title = flickrPhoto.title;// title
      //create image url
      var imageLink = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_b.jpg';
      //create image link
      var imageURL = 'https://www.flickr.com/photos/' + owner + '/' + id + '/in/set-' + imageSet;
      //add to flickrPhotoGroup object
      flickrPhotoGroup.push({'imageLink':imageLink,'title':title,'imageURL':imageURL});
      return flickrPhotoGroup;        
    };
  },
  //add the image set and event listeners for the dynamic bkg
  bkgImage : function(flickrPhotoGroup,idx) {
    var bkgImage = flickrPhotoGroup[idx];
    $('#dynamicBkg').css('background-image','url(' + bkgImage.imageLink + ')');
    $('#dynamicBkg .menu .title').html(bkgImage.title)
    $('#dynamicBkg .menu .link a').attr('href',bkgImage.imageURL);  
    $('.prev, .next').show();  
  },   
  //adding session storage for json object  
  setSessionStorage : function(){
    if (JSON.parse(sessionStorage.getItem('flickrPhotoGroup') == null)) { //must be null
       sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(Flickoluser.flickrPhotoGroup));       
    }    
  },
  getSessionStorage : function(){
    return JSON.parse(sessionStorage.getItem('flickrPhotoGroup'));
  },
  initBkgControls : function(flickrPhotoGroup,idx) {
    var photoGroup = flickrPhotoGroup;
    //add event listeners for prev/next btns
    $('.prev').click(function(){
      console.log('next',idx);
      createBkgImg(photoGroup,idx--);
    });
    $('.next').click(function(){
      console.log('next',idx);       
      createBkgImg(photoGroup,idx++);
    });
  }, 
  initBkg : function(flickrPhotoGroup) {
    var photoGroup = flickrPhotoGroup;
    //pick a random item from a set - https//gist.github.com/Phinome/ac24dc2a800ae2f2b165
    function randomFromSet(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }      
    //pick a random image to use as first wallpaper
    var idx = randomFromSet(1, photoGroup.length -1);
    //create the bkg image and menu  
    var bkgImage = photoGroup[idx];
    this.createBkgImg(photoGroup,idx);
    console.log('photoGroup[idx]',photoGroup[idx]);
    $('#dynamicBkg').css('background-image','url(' + bkgImage.imageLink + ')');
    $('#dynamicBkg .menu .title').html(bkgImage.title)
    $('#dynamicBkg .menu .link a').attr('href',bkgImage.imageURL);  
    $('.prev, .next').show();        
  }
}




function Flickolu(flickrData) {
  //create flickrPhotoGroup object
  var flickrPhotoGroup = [];
  for (var i in flickrData.photoset.photo) {
    var flickrPhoto = flickrData.photoset.photo[i]
    , owner = '94139373@N05' // owner ID
    , imageSet = 72157645741266837 // gallery ID, must be integer, not string
    , farmid = flickrPhoto.farm// farm ID
    , id = flickrPhoto.id// image ID
    , secret = flickrPhoto.secret// secret
    , serverid = flickrPhoto.server// server ID
    , title = flickrPhoto.title;// title
    //create image url
    var imageLink = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_b.jpg';
    //create image link
    var imageURL = 'https://www.flickr.com/photos/' + owner + '/' + id + '/in/set-' + imageSet;
    //add to flickrPhotoGroup object
    flickrPhotoGroup.push({'imageLink':imageLink,'title':title,'imageURL':imageURL});
  }
  //pick a random image to use as first wallpaper
  var idx = randomIntFromInterval(1, flickrPhotoGroup.length -1);
  //adding session storage for json
  if (JSON.parse(sessionStorage.getItem('flickrPhotoGroup') == null)) { //must be null
     sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(flickrPhotoGroup));       
  }
  bkgControlsInit(flickrPhotoGroup,idx)   //init bkg image and controls
};

//pick a random item from a set - https//gist.github.com/Phinome/ac24dc2a800ae2f2b165
function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};  

//add the image set and event listeners for the dynamic bkg
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
/*
  $('.prev').click(function(){
    console.log('next',idx);
    createBkgImg(flickrPhotoGroup,idx--);
  });
  $('.next').click(function(){
    console.log('next',idx);       
    createBkgImg(flickrPhotoGroup,idx++);
  });
*/
}
