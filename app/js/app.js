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
    url: 'http://janianderson.com/photos.json?callback=?',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data);
    }
  });
};