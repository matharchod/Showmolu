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
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'dynamicNavController'});
  $routeProvider.when('/page/:pageID', {templateUrl: 'partials/page.html', controller: 'pageController'});
  $routeProvider.when('/portfolio', {templateUrl: 'partials/portfolio.html', controller: 'portfolioController'});
  $routeProvider.when('/portfolio/:pageID/:pageFriendlyURL', {templateUrl: 'partials/portfolio-page.html', controller: 'portfolioController'});
  $routeProvider.when('/resume', {templateUrl: 'partials/resume.html', controller: 'resumeController'});
  $routeProvider.when('/twitolu', {templateUrl: 'partials/twitolu.html', controller: 'twitoluController'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
//Remove spaces from the title of a project 
//Convert spaces and special charachters to dashes
filter('removeSpaces', function(){ 
  return function (textString){
    if(textString){
      return textString.toLowerCase()
      .replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,'-')
      .replace(/[^a-z0-9-]/ig,'-');
    }
  }
}).
filter('htmlToPlaintext', function() {
  return function(text) {
    return String(text).replace(/<[^>]+>/gm, '');
  }
});

//Flickolu object
var Flickolu = {         
  //adding session storage for json object  
  setSessionStorage : function(data){
    sessionStorage.setItem('flickrPhotoGroup', JSON.stringify(data)); 
    console.log('Flickolu.setSessionStorage', data);
  },
  getSessionStorage : function(){
    console.log('Flickolu.getSessionStorage', JSON.parse(sessionStorage.getItem('flickrPhotoGroup')));
    return JSON.parse(sessionStorage.getItem('flickrPhotoGroup'));
  },
  randomFromSet : function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  changeDynamicBkg : function(flickrPhoto) {
    var imageTitle = flickrPhoto.title; 
    var imageURL = (['https://farm' + 
      flickrPhoto.farm + '.staticflickr.com/' + 
      flickrPhoto.server + '/' + flickrPhoto.id + '_' + 
      flickrPhoto.secret + '_b.jpg'   
    ]).join('');    
    //create image link
    var imageLink = (['https://www.flickr.com/photos/' + 
      '94139373@N05' + '/' + // owner ID 
      flickrPhoto.id + '/in/set-' + 
      '72157645741266837' //image set
    ]).join('');
    console.log('Flickolu.changeDynamicBkg imageURL', imageURL);
    return imageURL; //return bkg image URL   
  }            
}

//Behansolu object
var Behansolu = {
  getAllTags : function(behancePortfolio){
    var tags = [];
    //get all the tags from all the Behance projects
    for (var i in behancePortfolio.projects) {
      //add tags to array
      for (var x in behancePortfolio.projects[i].fields) {
        tags.push(behancePortfolio.projects[i].fields[x]);
      }
    }
    //remove duplicates    
    tags = tags.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    console.log('Tags',tags);
    return tags;  
  },  
  //adding session storage for json object  
  storePortfolio : function(data){
    sessionStorage.setItem('Behansolu_Portfolio', JSON.stringify(data));   
    console.log('Behansolu.storePortfolio', JSON.parse(sessionStorage.getItem('Behansolu_Portfolio')));
  },
  getPortfolio : function(){
    console.log('Behansolu.getPortfolio', JSON.parse(sessionStorage.getItem('Behansolu_Portfolio')));
    return JSON.parse(sessionStorage.getItem('Behansolu_Portfolio'));
  },
  storePortfolioItem : function(data){
    if (!data.project){
      console.log('Behansolu.storePortfolioItem: This project has no ID');
      return false;
    } else {
      var projectId = 'Behansolu_prj_' + data.project.id.toString();
      sessionStorage.setItem(projectId, JSON.stringify(data));   
      console.log('Behansolu.storePortfolioItem ' + projectId, JSON.parse(sessionStorage.getItem(projectId)));
      //return sessionStorage;
    }
  },
  getStoredPortfolioItem : function(projectId){
    if (!projectId) {
      console.log('Behansolu.getStoredPortfolioItem: This project has no ID');
      return false;
    } else {
      var projectId = 'Behansolu_prj_' + projectId;
      console.log('Behansolu.getStoredPortfolioItem ' + projectId, JSON.parse(sessionStorage.getItem(projectId)));
      return JSON.parse(sessionStorage.getItem(projectId));      
    }
  },  
  randomFromSet : function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

