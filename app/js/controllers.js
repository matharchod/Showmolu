'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('dynamicNavController', ['$scope', function($scope) {
    $scope.page = 'default';
  }])
  .controller('dynamicBkgController', ['$scope', function($scope) {
    $scope.item = 'default';
  }])
  .controller('portfolioController', ['$scope', function($scope) {
    $scope.page = 'home';
  }])
  .controller('pageController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
  }]); 