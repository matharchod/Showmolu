'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('appController', ['$scope', function($scope) {
    $scope.page = 'home';
    $scope.pageStatus = 'default'; 
    $scope.bkgImage = 'default';
    $scope.navStatus = 'closed';
    $scope.imageNavStatus = 'closed'; 
    $scope.flickrPhoto = [];
    
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
  .controller('dynamicBkgController', ['$scope', '$http', function($scope, $http)  {
    $scope.imageSet = '72157645741266837'; //flickr gallery ID
    $scope.owner = '94139373@N05'; //your flickr ID
    if (Flickoluser.getSessionStorage() == null){ //get sessionStorage 
      $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5ae3f6d6106e232dc531b19d44ccd668&photoset_id=' + $scope.imageSet + '&format=json&nojsoncallback=1').success(function(data) {
        Flickoluser.setSessionStorage(data);  
        // create dynamic background    
        $scope.flickrPhoto = $scope.data.photoset.photo;
        //console.log('$scope.flickrPhoto',$scope.flickrPhoto)
      });    
    };    
    console.log('Flickoluser.getSessionStorage',Flickoluser.getSessionStorage())
    //$scope.apiKey = '5ae3f6d6106e232dc531b19d44ccd668'; your flickr API key
    
  }])
  .controller('portfolioController', ['$scope', function($scope) {
  }])
  .controller('pageController', ['$scope', function($scope) {
  
  }]); 