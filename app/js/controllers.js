'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('appController', ['$scope', function($scope) {
    $scope.page = 'home';
    $scope.pageStatus = 'default';
    $scope.greeting = 'Hola!';   
    $scope.navStatus = 'default';
    $scope.bkgImage = 'default';
    $scope.imageNavStatus = 'closed'; 
  }])
  .controller('dynamicNavController', ['$scope', function($scope) {
  }])
  .controller('dynamicBkgController', ['$scope', function($scope) {
    $scope.imageNavStatus = 'closed';
    $scope.imageNavStatusToggle = function() {
      /* alert($scope.imageNavStatus); */
      if ($scope.imageNavStatus == 'closed') {
          $scope.imageNavStatus = 'open';
        } else {
          $scope.imageNavStatus = 'closed';
      }    
    } 
  }])
  .controller('portfolioController', ['$scope', function($scope) {
  }])
  .controller('pageController', ['$scope', function($scope) {
  }]); 