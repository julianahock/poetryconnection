(function () {     // Building controllers for api http requests 

    angular.module('poetApp')   
      .controller('IndexController', IndexController)   //append controller to module
    
    function IndexController($scope, $http, $window) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined

    	$scope.signIn = function() {
    	    if ($scope.currentUser !=null)
    	    {
                $http.get('/api/users?screenName=' + $scope.currentUser.screenName)
                    .then(function (result) {
                        if (result.data.length > 0) {
                            $scope.currentUser = result.data[0];
                            $scope.statusMessage = "";
                    	    $window.currentUser = $scope.currentUser; //$window allows global variable across controllers. http://stackoverflow.com/questions/19383725/how-to-access-global-js-variable-in-angularjs-directive
                        }
                        else {
                            $scope.statusMessage = "User not found";
                            $scope.currentUser = null;
                    	    $window.currentUser = null;
                        }
                    });
    	    }
    	}
    	
    	//currentUser is also stored in $window so it is global for all. $scope only scoped for a single controller
    	$scope.signOut = function() {
            $scope.currentUser = null;
    	    $window.currentUser = null;
    	}
    	
    	$scope.signedIn = function() {
    	    return $window.currentUser != null &&  $window.currentUser._id!=null;
    	}
    	
    	$scope.getCurrentUser = function () {
    	    return $window.currentUser;
    	}

    }

})();