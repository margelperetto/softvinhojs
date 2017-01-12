angular.module("softvinho").controller("cadastroClienteCtrl",function ($scope, $window, clientesAPI, errorAPI){

	$scope.clientes = [];

	var carregarClientes = function () {
		clientesAPI.getClientes()
		.then(function (sucess) {
			$scope.clientes = sucess.data;
		},function (error){
			$scope.message = errorAPI.configMsgError("Listar clientes",error);
		});
	};

	$scope.salvarCliente = function (cliente){
		clientesAPI.saveCliente(cliente)
		.then(function (sucess) {
			carregarClientes();
			$scope.limparCadastro();
		},function (error){
			$scope.message = errorAPI.configMsgError("Salvar cliente",error);
		});
	};

	$scope.removerCliente = function (cliente){
		clientesAPI.deleteCliente(cliente)
		.then(function (sucess) {
			$scope.clientes.splice($scope.clientes.indexOf(cliente),1);
			if($scope.cliente && $scope.cliente.id === cliente.id){
				$scope.limparCadastro();
			}
		},function (error){
			$scope.message = errorAPI.configMsgError("Remover cliente",error);
		});
	};

	$scope.editarCliente = function (cliente){
		$scope.limparCadastro();
		$scope.cliente = angular.copy(cliente);
		$window.scrollTo(0, 0);
	};

	$scope.limparCadastro = function (){
		delete $scope.cliente;
		delete $scope.message;
		$scope.clienteForm.$setPristine();
	};
			
	$scope.ordenarPor = function (campo){
		$scope.campoOrdenacao = campo;
		$scope.inverterOrdem = !$scope.inverterOrdem;
	};

	carregarClientes();
});