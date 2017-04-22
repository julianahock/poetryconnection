(function () {     // Building controllers for api http requests 

    angular.module('poetApp')   
      .controller('PoemsController', PoemsController)   //append controller to module
     
    function PoemsController($scope, $http, $window) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined
        $scope.poems = [];
    
        $http.get('/api/poems')
            .then(function (result) {
                $scope.poems = result.data;
            });
            
        $scope.addPoem = function() {
            $http.post('/api/poems', $scope.newPoem)
                .then(function (result) {
                   if(result)
                   {
                       
                   }
                });
    	}
    	
    	$scope.goToPoem = function (poem) {
    	     $window.location = "/#/viewpoem/"+poem._id;
    	}
        $scope.deletePoem = function(poemId) {
            $http.delete('/api/poems/' + poemId)
                .then(function (result) {
                   if(result)
                   {
                     $http.get('/api/poems')
                        .then(function (result) {
                           $scope.poems = result.data;
                       });   
                   }
                });
        }
    }
})();