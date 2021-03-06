'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute','ngResource'])
  .controller('appController', ['$scope','$rootScope', '$location', '$timeout', 'BehanceItem', function($scope, $rootScope, $location, $timeout, BehanceItem) {
  
    $rootScope.page = 'home';
    $rootScope.pageStatus = 'default'; //describes the type of page
    $rootScope.dynamicNavStatus = 'closed';// main nav panel status    
    $rootScope.imageNavStatus = 'hidden';//Flickr image nav status
    $rootScope.behance_prj = ''; //single Behance project
    $rootScope.subNavItems = '';    
    $rootScope.getBehanceItem = function(projectId){
    
      BehanceItem.query({ method: "GET", isArray: false, projectId: projectId });
            
      $timeout(function(){

        $rootScope.behance_prj = Behansolu.getStoredPortfolioItem(projectId);
        
        try {
        
          $rootScope.subNavItems = $rootScope.behance_prj.project.fields;
          
        } catch(err) {
          
          console.log('There are no subnav items', err);
            
        } 
                  
        console.log('Behance fields: ', $rootScope.subNavItems);
        console.log('$rootScope.behance_prj',$rootScope.behance_prj);
        
        }, 1000);
          
    };
    
    
    
    $rootScope.dynamicNavStatusToggle = function(newStatus) {
      if (!newStatus) {
        if ($rootScope.dynamicNavStatus != 'open') {
            $rootScope.dynamicNavStatus = 'open';
            $rootScope.pageStatus == 'contentpage'
          } else {
            $rootScope.dynamicNavStatus = 'closed';
        }        
      } else {
        $rootScope.dynamicNavStatus = newStatus; 
      }
    
    };
    
    $rootScope.imageNavStatusToggle = function() {
      if ($rootScope.imageNavStatus == 'hidden') {
          $rootScope.imageNavStatus = 'open';
          $rootScope.dynamicNavStatus = 'hidden';
        } else {
          $rootScope.imageNavStatus = 'hidden';
          $rootScope.dynamicNavStatus = 'closed ';
      }    
    };     

    //update dynamicNav
    $rootScope.$on('$locationChangeStart', function(event) {
      //if location is not home or if location contains '/page'    
      if ($location.path() != '/home' || $location.path().indexOf('page') != -1) {
        //change pageStatus
        $rootScope.pageStatus = 'contentpage'; 
        //change navStatus
        $rootScope.dynamicNavStatus = 'open'; 
        var behancePrjID = $location.path().split('/')[2]; 
        //add Behance project data
        $rootScope.getBehanceItem(behancePrjID);
        //add subNav data
        console.log('Behance item: ', behancePrjID);
      } else {
        $rootScope.pageStatus = 'default';
      }
    });
          
    
    $scope.thumbsStatus = "hidden"; 
    
    $scope.thumbsStatusToggle = function() {
      if ($scope.thumbsStatus == 'hidden') {
          $scope.thumbsStatus = 'open';
        } else {
          $scope.thumbsStatus = 'hidden';
      }    
    };        
        
  }]) 
  .controller('pageController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {}])     
  .controller('portfolioController', ['$scope', '$rootScope', '$timeout', '$interval', '$location', 'BehancePortfolio', 'BehanceItem', function($scope, $rootScope, $timeout, $interval, $location, BehancePortfolio, BehanceItem) {
                      

    //check sessionStorage for Behance portfolio data
    $scope.behanceData = Behansolu.getPortfolio(); 
        
    //if sessionStorage is empty, get new flickr data
    if (!$scope.behanceData || $scope.behanceData === null || $scope.behanceData === undefined || $scope.behanceData == '') { 
      
      //Query returns a service with a callback to setSesstionStorage 
      BehancePortfolio.query();
      
      //HACK - we should to resolve a promise to update
      $timeout(function(){
      
        $scope.behanceData = Behansolu.getPortfolio();
        $rootScope.subNavItems = Behansolu.getAllTags($scope.behanceData);   

        }, 1000);
    
    } else {
      
      $scope.behanceData = Behansolu.getPortfolio();
      $rootScope.subNavItems = Behansolu.getAllTags($scope.behanceData);   

    }
       
    
  }])
  .controller('resumeController', ['$scope', '$rootScope', function($scope, $rootScope) {}])  
  .controller('dynamicNavController', ['$scope', '$rootScope', function($scope, $rootScope) {
    //nav status 
    //about me link
    //about me - resume link
    //about me - creative link
    //about me - code link
    //about me - ux diary link
    //contact me
    
  }])
  .controller('dynamicBkgController', ['$scope', '$rootScope', 'FlickrPhotos', function($scope, $rootScope, FlickrPhotos)  {
    
    $scope.flickrData = Flickolu.getSessionStorage(); 
    
    //set up dynamic background image and controls
    //NOTE: try moving this to Flickolu      
    $scope.setupBkg = function(){
    
      //pick a random image to use as first wallpaper 
      $scope.idx = Flickolu.randomFromSet(1, $scope.flickrData.photoset.photo.length -1); 
      
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
        console.log('$scope.$watch(idx) ' + $scope.idx,$scope.flickrData.photoset.photo[$scope.idx].title);   
      });  
      
    }

    //create image url
    //NOTE: try moving this to Flickolu  
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
    
    //if sessionStorage is empty, get new flickr data
    if (!$scope.flickrData || $scope.flickrData === null || $scope.flickrData === undefined || $scope.flickrData == '') {
      
      FlickrPhotos.query(function(data) {
        Flickolu.setSessionStorage(data);
        $scope.flickrData = data;
        $scope.setupBkg();
        $scope.changeDynamicBkg($scope.flickrData.photoset.photo[$scope.idx]);
      });     
      
    } else {

      $scope.flickrData = Flickolu.getSessionStorage(); 
      $scope.setupBkg();
      $scope.changeDynamicBkg($scope.flickrData.photoset.photo[$scope.idx]);
      
    }      
        
  }])
  .controller('dashboardController', ['$scope', '$rootScope', function($scope, $rootScope) {}])
  .controller('twitoluController', ['$scope', '$rootScope', function($scope, $rootScope) {}]);