
angular.module('poetApp', [])    // empty dependencies array 
  .controller('PoetController', PoetController)   //append controller to module
 
function PoetController($scope, $http) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined
    $scope.poems = [];

    $http.get('/api/poems')
        .then(function (result) {
            $scope.poems = result.data;
        });
}

