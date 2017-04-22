(function () {     // Building controllers for api http requests 

    angular.module('poetApp')   
      .controller('RegisterController', RegisterController)   //append controller to module
     
    function RegisterController($scope, $http, $window) { //http://stackoverflow.com/questions/13759120/angularjs-referenceerror-http-is-not-defined

    	$scope.addUser = function() {
            $http.post('/api/users', $scope.currentUser)
                .then(function (result) {
                   if(result)  //TODO handle and disply error and don't go to home page if there is an error
                   {
                       $scope.currentUser=result.data; //we want the newly created that is returned so we can grab the _id
                	   $window.currentUser=$scope.currentUser;
                       $window.location = "/#/"; //Go to home http://stackoverflow.com/questions/11003916/angularjs-how-do-i-switch-views-from-a-controller-function
                   }
                },function(response){ //http://stackoverflow.com/questions/17080146/error-handling-in-angularjs-http-get-then-construct
                     console.log(response) 
                     $window.alert("ERROR" + response.data.errmsg);
                   }
                )
    	}
    }

})();