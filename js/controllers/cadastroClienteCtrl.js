angular.module("softvinho").controller("cadastroClienteCtrl",function ($scope, $window, clientesAPI, freteAPI){

	freteAPI.calcularFrete(110,4.125).then(
		function (success){
			console.log("TESTANDO CALCULO FRETE: "+success.data);
		}, function (error){
			console.log("Erro ao calular frete: "+erro.data);
		}
	);

	$scope.app = "Cadastro de Clientes";
	$scope.clientes = [];

	var carregarClientes = function () {
		clientesAPI.getClientes()
		.then(function (sucess) {
			$scope.clientes = sucess.data;
		},function (error){
			$scope.message = "Não foi possível listar todos os clientes :(";
		});
	};

	$scope.salvarCliente = function (cliente){
		clientesAPI.saveCliente(cliente)
		.then(function (sucess) {
			carregarClientes();
			$scope.limparCadastro();
		},function (error){
			$scope.message = "Não foi possível salvar o cadastro do cliente :(";
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
			$scope.message = "Não foi possível excluir o cliente :(";
		});
	};

	$scope.editarCliente = function (cliente){
		$scope.cliente = angular.copy(cliente);
		$window.scrollTo(0, 0);
	};

	$scope.limparCadastro = function (){
		delete $scope.cliente;
		$scope.clienteForm.$setPristine();
	};
			
	$scope.ordenarPor = function (campo){
		$scope.campoOrdenacao = campo;
		$scope.inverterOrdem = !$scope.inverterOrdem;
	};

	carregarClientes();
});