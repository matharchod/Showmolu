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
}]);

//Flickolu object
var Flickolu = {
  //adding session storage for json object  
  setSessionStorage : function(data){
    sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(data)); 
  },
  getSessionStorage : function(){
    return JSON.parse(sessionStorage.getItem('flickrPhotoGroup'));
    console.log('getSessionStorage', JSON.parse(sessionStorage.getItem('flickrPhotoGroup')));
  },
  randomFromSet : function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }      
}
