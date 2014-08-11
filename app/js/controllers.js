'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('appController', ['$scope','$rootScope', function($scope, $rootScope) {
  
    $rootScope.page = 'home';
    $rootScope.pageStatus = 'default'; 
    $rootScope.dynamicNavStatus = 'closed';
    
    $rootScope.dynamicNavStatusToggle = function() {
      if ($scope.dynamicNavStatus != 'open') {
          $scope.dynamicNavStatus = 'open';
        } else {
          $scope.dynamicNavStatus = 'closed';
      }    
    };      
    
    $scope.imageNavStatus = 'closed';
    $scope.thumbsStatus = "hidden"; 
    
    $scope.imageNavStatusToggle = function() {
      if ($scope.imageNavStatus == 'hidden') {
          $scope.imageNavStatus = 'open';
          $scope.dynamicNavStatus = 'hidden';
        } else {
          $scope.imageNavStatus = 'hidden';
          $scope.dynamicNavStatus = 'closed ';
      }    
    }; 
    
    $scope.thumbsStatusToggle = function() {
      if ($scope.thumbsStatus == 'hidden') {
          $scope.thumbsStatus = 'open';
        } else {
          $scope.thumbsStatus = 'hidden';
      }    
    };        
        
  }])  
  .controller('portfolioController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.dynamicNavStatus = 'top';
    //$scope.toggleDashboard;
    //console.log('changeDynamicNavStatus',changeDynamicNavStatus);    
  }])
  .controller('dynamicNavController', ['$scope', function($scope) {
    //nav status 
    //about me link
    $scope.toggleDashboard = function(){
      if ($scope.dynamicNavStatus != 'open') {
        $scope.dynamicNavStatus = 'open';
      } else {
        $scope.dynamicNavStatus = 'closed'; 
      }
       
    }
    //about me - resume link
    //about me - creative link
    //about me - code link
    //about me - ux diary link
    //contact me
    
  }])
  .controller('dynamicBkgController', ['$scope', '$http', function($scope, $http)  {
    //get stored flickr data from sessionStorage
    $scope.flickrData = Flickolu.getSessionStorage(); 
    //if sessionStorage is empty, get new flickr data
    if ($scope.flickrData == null){ 
      $scope.imageSet = '72157645741266837'; //flickr gallery ID
      $scope.owner = '94139373@N05'; //your flickr ID     
      $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5ae3f6d6106e232dc531b19d44ccd668&photoset_id=' + $scope.imageSet + '&format=json&nojsoncallback=1').success(function(data) {
        Flickolu.setSessionStorage(data);  
        // create dynamic background 
        $scope.flickrData = data;
      });    
    }       
    //create image url
    $scope.changeDynamicBkg = function(flickrPhoto) {
      $scope.flickrPhoto = flickrPhoto;
      $scope.imageTitle = $scope.flickrPhoto.title;
      $scope.imageURL = (['https://farm' + 
        $scope.flickrPhoto.farm + '.staticflickr.com/' + 
        $scope.flickrPhoto.server + '/' + $scope.flickrPhoto.id + '_' + 
        $scope.flickrPhoto.secret + '_b.jpg'   
      ]).join('');    
      //create image link
      $scope.imageLink = (['https://www.flickr.com/photos/' + 
        '94139373@N05' + '/' + // owner ID 
        $scope.flickrPhoto.id + '/in/set-' + 
        '72157645741266837' //image set
      ]).join('');
      $scope.bkgImage = 'url(' + $scope.imageURL + ')'; //create bkg image CSS     
      $scope.photoSet = $scope.flickrData.photoset.photo;     
    }    
    
    //pick a random image to use as first wallpaper 
    $scope.idx = Flickolu.randomFromSet(1, $scope.flickrData.photoset.photo.length -1); 
    $scope.changeDynamicBkg($scope.flickrData.photoset.photo[$scope.idx]);
    
    //prev/next - http//wwwsitepointcom/creating-slide-show-plugin-angularjs/     
    $scope.next = function() {
      $scope.idx < $scope.flickrData.photoset.photo.length - 1 ? $scope.idx++ : $scope.idx = 0;
      return $scope.idx;
    };     
    $scope.prev = function() {
      $scope.idx > 0 ? $scope.idx-- : $scope.idx = $scope.flickrData.photoset.photo - 1;
    };

    //update bkgImage
    $scope.$watch('idx', function() {
      $scope.changeDynamicBkg($scope.flickrData.photoset.photo[$scope.idx]);
      console.log('$scope.changeDynamicBkg ' + $scope.idx,$scope.flickrData.photoset.photo[$scope.idx]);   
    });  
    
  }])
  .controller('pageController', ['$scope', function($scope, $location) {
    //$scope.dynamicNavStatus = 'top';
    console.log('$location.path()',$location.path());
  }])  
  .controller('dashboardController', ['$scope', function($scope) {}])
  .controller('resumeController', ['$scope', function($scope) {}])
  .controller('twitoluController', ['$scope', function($scope) {}]);