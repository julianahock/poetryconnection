(function () {

  angular.module('poetApp', ['ngRoute']).config(myConfig); 

  // $routeProvider allows to set up routes 
  function myConfig ($routeProvider) {
    $routeProvider    // inline template
       .when('/', {   templateUrl: 'poems.html', controller: 'PoemsController'})
       .when('/register', { templateUrl:  'register.html', controller: 'RegisterController', controllerAs: 'regCon' })
       .when('/createpoem', { templateUrl:  'createpoem.html', controller: 'CreatePoemController', controllerAs: 'regCon' })
       .when('/viewpoem/:poemId', { templateUrl:  'viewpoem.html',controller: 'ViewPoemController', controllerAs: 'regCon' })
       .when('/users', { templateUrl:  'users.html', controller: 'UsersController', controllerAs: 'regCon' })
       .when('/createreview/:poemId', { templateUrl:  'createreview.html', controller: 'CreateReviewController', controllerAs: 'regCon' })
       .when('/myreviews', { templateUrl:  'myreviews.html', controller: 'MyReviewsController', controllerAs: 'regCon' })
       .when('/about', { templateUrl: 'about.html'})
    //   .when('/test', { 
    //     templateUrl: 'other/test.html',
    //     controller: 'TestController', controllerAs: 'testCon' })
      
    //   .when('/faculty', { 
    //      templateUrl: 'other/faculty.html',
    //      controller: 'FacController', controllerAs: 'facCon' });
  }


})();