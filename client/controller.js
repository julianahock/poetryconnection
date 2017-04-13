
angular.module('poetApp', [])    // empty dependencies array 
  .controller('PoetController', PoetController)   //append controller to module
 
function PoetController($scope, $http) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined
    $scope.poems = [];

    $http.get('/api/poems')
        .then(function (result) {
            $scope.poems = result.data;
        });
        
    $http.get('/api/users')
        .then(function (result) {
            $scope.users = result.data;
        });
        
    $http.get('/api/reviews')
        .then(function (result) {
            $scope.reviews = result.data;
        });        
        
    $scope.addPoem = function() {
        $http.post('/api/poem', $scope.newPoem)
            .then(function (result) {
               if(result)
               {
                   
               }
            });
	}
	
	$scope.addUser = function() {
        $http.post('/api/user', $scope.user)
            .then(function (result) {
               if(result)
               {
                  $scope.$apply();      //http://stackoverflow.com/questions/12304728/how-can-i-tell-angularjs-to-refresh    
               }
            });
	}
	
	$scope.logIn = function() {
        $http.get('/api/users?screenName=' + $scope.currentUser.screenName)
            .then(function (result) {
                if (result.data.length > 0) {
                    $scope.currentUser = result.data[0];
                    $scope.statusMessage = "";
                }
                else {
                    $scope.statusMessage = "User not found";
                    $scope.currentUser = null;
                }
            });
	}
}

