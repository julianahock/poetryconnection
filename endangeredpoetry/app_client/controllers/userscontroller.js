(function () {     // Building controllers for api http requests 

    angular.module('poetApp')   
      .controller('UsersController', UsersController)   //append controller to module
      
    function UsersController($scope, $http, $window) { 
        $scope.users = [];

        $http.get('/api/users')
            .then(function (result) {
                $scope.users = result.data;
            });

    
        $scope.deleteUser = function(userId) {
            $http.delete('/api/users/' + userId)
                .then(function (result) {
                   if(result)
                   {
                       $http.get('/api/users')
                        .then(function (result) {
                            $scope.users = result.data;
                         
                        });   
                   }
                });
        }
    }
})();