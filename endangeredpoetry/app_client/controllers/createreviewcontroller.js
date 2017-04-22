(function () {
    angular.module('poetApp')   
      .controller('CreateReviewController', CreateReviewController)   //append controller to module
     
    function CreateReviewController($scope, $http, $window, $routeParams) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined
        var poemId = $routeParams.poemId;
        
        $scope.addReview = function() {
            if ($window.currentUser == null) {
                alert("not logged in");
            }
            else {
                $scope.newReview.userId = $window.currentUser._id;
                $scope.newReview.poemId = poemId;
                $http.post('/api/reviews', $scope.newReview)
                 .then(function (result) {
                       if(result)
                       {
                           $window.location = "/#/viewpoem/" + poemId;
                       }
                    });
        	}
        }
    }
})();