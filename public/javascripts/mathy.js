var app = angular.module('Mathy', ['ngResource', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
	    controller: 'HomeCtrl'
        })
	.when('/add-formula', {
		templateUrl: 'partials/formula-form.html',
		controller: 'AddFormulaCtrl'
	})
	.when('/formula/:id', {
		templateUrl: 'partials/formula-form.html'
	})
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
	function($scope, $resource){
		var Formulas = $resource('/api/formulas');
		Formulas.query(function(formulas){
			$scope.formulas = formulas;
		});
	}]);

app.controller('AddFormulaCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Formulas = $resource('/api/formulas');
            Formulas.save($scope.formula, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('EditFormulaCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var Formulas = $resource('/api/formulas/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Formulas.get({ id: $routeParams.id }, function(formula){
            $scope.formula = formula
        });

        $scope.save = function(){
            Formulas.update($scope.formula, function(){
                $location.path('/');
            });
        }
    }]);
