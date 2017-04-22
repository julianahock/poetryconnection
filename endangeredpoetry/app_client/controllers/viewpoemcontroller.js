(function () {     // Building controllers for api http requests 

    angular.module('poetApp')   
      .controller('ViewPoemController', ViewPoemController)   //append controller to module
     
    function ViewPoemController($scope, $http, $routeParams, $window) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined
    var poemId = $routeParams.poemId;
    
        $http.get('/api/poems/' + poemId)
            .then(function (result) {
                $scope.poem = result.data;
            });
            
        $http.get('/api/reviews?poemId=' + poemId)
            .then(function (result) {
                $scope.reviews = result.data;
            });   
            
        $scope.deleteReview = function(reviewId) {
            $http.delete('/api/reviews/' + reviewId)
                .then(function (result) {
                   if(result)
                   {
                       $http.get('/api/reviews?poemId=' + poemId)
                        .then(function (result) {
                            $scope.reviews = result.data;
                        });   
                   }
                });
    	}
            
    	$scope.getCurrentUser = function () {
    	    return $window.currentUser;
    	}
    	
    	$scope.signedIn = function() {
    	    return $window.currentUser != null &&  $window.currentUser._id!=null;
    	}
    	
    }

})();