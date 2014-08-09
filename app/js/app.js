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
