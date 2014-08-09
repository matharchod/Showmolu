'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('dynamicBeeyotch',function(){
    return function(scope, elm, attrs){
      elem.text('Heyo!');
    }
  });
