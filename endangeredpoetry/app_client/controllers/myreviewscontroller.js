(function () {     // Building controllers for api http requests 

    angular.module('poetApp')   
      .controller('MyReviewsController', MyReviewsController)   //append controller to module
     
    function MyReviewsController($scope, $http, $window) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined

        $http.get('/api/reviews')
            .then(function (result) {
                $scope.reviews = result.data;
            });        
    }

})();