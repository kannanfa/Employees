var app = angular.module('myApp', []);

function mainController($scope, $http, $location) {
$scope.user = {};
$scope.qq={};
$scope.formdas={};

if($location.search()['id']){
    alert('jhgjhgj'); 
}
   


$scope.createTodo = function() {

console.log("user");
        $http.post('/api/formda', $scope.user)
            .success(function(data) {
                  console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


$http.get('/api/formdas')
        .success(function(data) {
            $scope.formdas = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.deleteTodo = function(id) {
        $http.delete('/api/formdas/' + id)
            .success(function(data) {
                 $scope.formdas =data;
              // $route.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };




    $scope.edit=function(id){
        window.location='/index.html?id=' + id;
        return;

         $http.get('/api/formdas/'+id)
          .success(function(data) {
            $scope.qq = data;
            $scope.user.push($scope.qq);
           //$scope.user=data;
            $scope.$apply();
            console.log("STUPID");
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });



    };





    $scope.update=function(form){
        console.log(form);

    $http.post('/api/update', form)
            .success(function(data) {
               // $scope.todos = data;
               console.log("success");
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
 

    }


};

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/view', {
                templateUrl : 'pages/view.html',
                controller  : 'viewController'
            })

            // route for the contact page
          
    });

    // create the controller and inject Angular's $scope
 

  app.controller('viewController', function($scope) {
        //$scope.message = 'Look! I am an about page.';
    });

  