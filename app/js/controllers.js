'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('dynamicNavController', ['$scope', function($scope) {
    $scope.page = 'home';
    $scope.navStatus = 'default';
  }])
  .controller('dynamicBkgController', ['$scope', function($scope) {
    $scope.bkgImage = 'default';
    $scope.imageNavStatus = 'closed';
    $scope.imageNavStatusToggle = function() {
      $scope.imageNavStatus = 'open';
      alert($scope.imageNavStatus);
/*
      if () {
        
        } else {
      }  
*/  
    } 
  }])
  .controller('portfolioController', ['$scope', function($scope) {
    $scope.page = 'home';
  }])
  .controller('pageController', ['$scope', function($scope) {
    $scope.pageStatus = 'default';
    $scope.greeting = 'Hola!';
  }]); 