angular.module("softvinho").controller("cadastroClienteCtrl",function ($scope, $window, clientesAPI){

	$scope.clientes = [];

	var carregarClientes = function () {
		clientesAPI.getClientes()
		.then(function (sucess) {
			$scope.clientes = sucess.data;
		},function (error){
			$scope.message = "Não foi possível listar todos os clientes "+error.status+"-"+error.statusText;
		});
	};

	$scope.salvarCliente = function (cliente){
		clientesAPI.saveCliente(cliente)
		.then(function (sucess) {
			carregarClientes();
			$scope.limparCadastro();
		},function (error){
			if(error.status == 409){
				$scope.message = "Já existe um cliente cadastrado com esse nome";
			}else{
				$scope.message = "Não foi possível salvar o cadastro do cliente. "+error.status+"-"+error.statusText;
			}
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
			$scope.message = "Não foi possível excluir o cliente "+error.status+"-"+error.statusText;
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