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
  $routeProvider.when('/dahsboard', {templateUrl: 'partials/dashboard.html', controller: 'dashboardController'});
  $routeProvider.when('/nav', {templateUrl: 'partials/nav.html', controller: 'dynamicNavController'});
  $routeProvider.when('/portfolio', {templateUrl: 'partials/portfolio.html', controller: 'portfolioController'});
  $routeProvider.when('/portfolio/page/:pageID', {templateUrl: 'partials/portfolioPage.html', controller: 'portfolioController'});
  $routeProvider.when('/resume', {templateUrl: 'partials/resume.html', controller: 'resumeController'});
  $routeProvider.when('/twitolu', {templateUrl: 'partials/twitolu.html', controller: 'twitoluController'});
  $routeProvider.otherwise({redirectTo: '/dahsboard'});
}]);

//Flickolu object
var Flickolu = {
  //adding session storage for json object  
  setSessionStorage : function(data){
    if (JSON.parse(sessionStorage.getItem('flickrPhotoGroup') == null)) {
       sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(data));       
    }    
  },
  getSessionStorage : function(){
    return JSON.parse(sessionStorage.getItem('flickrPhotoGroup'));
  },
  randomFromSet : function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }      
}
