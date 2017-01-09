angular.module("softvinho").controller("cadastroClienteCtrl",function ($scope, $window, clientesAPI, freteAPI){

	freteAPI.calcularFrete(110,4.125).then(
		function (success){
			console.log("TESTANDO CALCULO FRETE: "+success.data);
		}, function (error){
			console.log("Erro ao calular frete: "+erro.data);
		}
	);

	$scope.app = "Cadastro de Clientes";
	$scope.contatos = [];

	var carregarClientes = function () {
		clientesAPI.getClientes()
		.then(function (sucess) {
			$scope.contatos = sucess.data;
		},function (error){
			$scope.message = "Opps... não foi possível carregar clientes :(";
		});
	};

	$scope.salvarCliente = function (cliente){
		clientesAPI.saveCliente(cliente)
		.then(function (sucess) {
			carregarClientes();
			$scope.limparCadastro();
		},function (error){
			$scope.message = "Opps... não foi possível salvar cliente :(";
		});
	};

	$scope.removerCliente = function (cliente){
		clientesAPI.deleteCliente(cliente)
		.then(function (sucess) {
			$scope.contatos.splice($scope.contatos.indexOf(cliente),1);
		},function (error){
			$scope.message = "Opps... não foi possível excluir cliente :(";
		});
	};

	$scope.editarCliente = function (cliente){
		$scope.contato = angular.copy(cliente);
		$window.scrollTo(0, 0);
	};

	$scope.limparCadastro = function (){
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
	};
			
	$scope.ordenarPor = function (campo){
		$scope.campoOrdenacao = campo;
		$scope.inverterOrdem = !$scope.inverterOrdem;
	};

	carregarClientes();
});