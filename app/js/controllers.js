'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('appController', ['$scope', function($scope) {
    $scope.page = 'home';
    $scope.pageStatus = 'default'; 
    $scope.bkgImage = 'default';
    $scope.navStatus = 'closed';
    $scope.imageNavStatus = 'closed'; 
    
    $scope.imageNavStatusToggle = function() {
      if ($scope.imageNavStatus == 'closed') {
          $scope.imageNavStatus = 'open';
          $scope.navStatus = 'gone';
        } else {
          $scope.imageNavStatus = 'closed';
          $scope.navStatus = 'closed';
      }    
    }; 
    
     $scope.navStatusToggle = function() {
      if ($scope.navStatus == 'closed') {
          $scope.navStatus = 'open';
        } else {
          $scope.navStatus = 'closed';
      }    
    };  
        
  }])
  .controller('dynamicNavController', ['$scope', function($scope) {
   
  }])
  .controller('dynamicBkgController', ['$scope', function($scope) {
    Flickolu('94139373@N05','72157645741266837');  // owner, imageSet      
    $scope.photos = Flickoluser.getFlickrPhotoGroup();
    console.log('$scope.photos',$scope.photos);
  }])
  .controller('portfolioController', ['$scope', function($scope) {
  }])
  .controller('pageController', ['$scope', function($scope) {
  
  }]); 