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

myAppService.factory('BehanceItems', function($resource){
  return $resource('https://www.behance.net/v2/users/jani312/projects?client_id=MkEs5mltD9t1wVqV9kiv2QUeT3OVVHju&sort=published_date&callback=Behansolu.setSessionStorage', {}, {
    query: {method:'JSONP', isArray:false}
  });
});
  