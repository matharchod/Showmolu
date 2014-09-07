'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myAppService = angular.module('myApp.services', ['ngResource']);

myAppService.factory('FlickrPhotos', function($resource){
  return $resource('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5ae3f6d6106e232dc531b19d44ccd668&photoset_id=72157645741266837&format=json&nojsoncallback=1', {}, {
    query: {method:'GET', isArray:false}
  });
});
  
