angular.module("softvinho").config(function ($routeProvider) {
	$routeProvider.when("/main", {
		templateUrl: "view/main.html"
	});
	$routeProvider.when("/clientes", {
		templateUrl: "view/clientes.html"
	});
	$routeProvider.when("/vinhos", {
		templateUrl: "view/vinhos.html"
	});
	$routeProvider.when("/vendas", {
		templateUrl: "view/vendas.html"
	});
	$routeProvider.otherwise({redirectTo: "/main"});
});