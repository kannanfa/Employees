var app = angular.module('myApp', []);


function mainController($scope, $http) {
$scope.createTodo = function(id) {

	$scope.user.lastname.push(id);
	$scope.apply();

};
}