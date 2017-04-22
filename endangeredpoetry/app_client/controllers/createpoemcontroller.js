(function () {     // Building controllers for api http requests 

    angular.module('poetApp')   
      .controller('CreatePoemController', CreatePoemController)   //append controller to module
     
    function CreatePoemController($scope, $http, $window) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined
            
        $scope.addPoem = function() {
            $http.post('/api/poems', $scope.newPoem)
                .then(function (result) {
                   if(result)
                   {
                       $window.location = "/#/"; //Go to home http://stackoverflow.com/questions/11003916/angularjs-how-do-i-switch-views-from-a-controller-function
                   }
                });
    	}
    }

})();