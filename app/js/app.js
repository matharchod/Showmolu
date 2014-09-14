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
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'dynamicNavController'});
  $routeProvider.when('/page/:pageID', {templateUrl: 'partials/page.html', controller: 'pageController'});
  $routeProvider.when('/portfolio', {templateUrl: 'partials/portfolio.html', controller: 'portfolioController'});
  $routeProvider.when('/portfolio/page/:pageID', {templateUrl: 'partials/portfolio-page.html', controller: 'portfolioController'});
  $routeProvider.when('/resume', {templateUrl: 'partials/resume.html', controller: 'resumeController'});
  $routeProvider.when('/twitolu', {templateUrl: 'partials/twitolu.html', controller: 'twitoluController'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
//Remove spaces from the title of a project 
//Convert spaces and special charachters to dashes
filter('removeSpaces', function(){ 
  return function (textString){
    if(textString){
      return textString.toLowerCase()
      .replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,'-')
      .replace(/[^a-z0-9-]/ig,'-');
    }
  }
});

//Flickolu object
var Flickolu = {
  //adding session storage for json object  
  setSessionStorage : function(data){
    sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(data)); 
    console.log('Flickolu.setSessionStorage', data);
  },
  getSessionStorage : function(){
    console.log('Flickolu.getSessionStorage', JSON.parse(sessionStorage.getItem('flickrPhotoGroup')));
    return JSON.parse(sessionStorage.getItem('flickrPhotoGroup'));
  },
  randomFromSet : function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  changeDynamicBkg : function(flickrPhoto) {
    var imageTitle = flickrPhoto.title;
    var imageURL = (['https://farm' + 
      flickrPhoto.farm + '.staticflickr.com/' + 
      flickrPhoto.server + '/' + flickrPhoto.id + '_' + 
      flickrPhoto.secret + '_b.jpg'   
    ]).join('');    
    //create image link
    var imageLink = (['https://www.flickr.com/photos/' + 
      '94139373@N05' + '/' + // owner ID 
      flickrPhoto.id + '/in/set-' + 
      '72157645741266837' //image set
    ]).join('');
    console.log('Flickolu.changeDynamicBkg imageURL', imageURL);
    return imageURL; //return bkg image URL   
  }            
}

//Behansolu object
var Behansolu = {
  //adding session storage for json object  
  setSessionStorage : function(data){
    sessionStorage.setItem('behancePortfolioItems', JSON.stringify(data)); 
    console.log('Behansolu.setSessionStorage', data);
  },
  getSessionStorage : function(){
    console.log('Behansolu.getSessionStorage', JSON.parse(sessionStorage.getItem('behancePortfolioItems')));
    return JSON.parse(sessionStorage.getItem('behancePortfolioItems'));
  },
  randomFromSet : function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

