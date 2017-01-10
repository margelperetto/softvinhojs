angular.module("softvinho").controller("cadastroVendaCtrl",function ($scope, $window, vendasAPI, clientesAPI, vinhosAPI){

	$scope.vendas = [];
	$scope.vinhos = [];
	$scope.clientes = [];

	var carregarVendas = function () {
		vendasAPI.getVendas()
		.then(function (sucess) {
			$scope.vendas = sucess.data;
		},function (error){
			$scope.message = "Não foi possível listar todos os vendas :(";
		});
	};

	var carregarClientes = function () {
		clientesAPI.getClientes()
		.then(function (sucess) {
			$scope.clientes = sucess.data;
		},function (error){
			$scope.message = "Não foi possível listar todos os clientes :(";
		});
	};

	var carregarVinhos = function () {
		vinhosAPI.getVinhos()
		.then(function (sucess) {
			$scope.vinhos = sucess.data;
		},function (error){
			$scope.message = "Não foi possível listar todos os vinhos :(";
		});
	};

	$scope.salvarVenda = function (venda){
		vendasAPI.saveVenda(venda)
		.then(function (sucess) {
			carregarVendas();
			$scope.limparCadastro();
		},function (error){
			$scope.message = "Não foi possível salvar o cadastro do venda :(";
		});
	};

	$scope.removerVenda = function (venda){
		vendasAPI.deleteVenda(venda)
		.then(function (sucess) {
			$scope.vendas.splice($scope.vendas.indexOf(venda),1);
			if($scope.venda && $scope.venda.id === venda.id){
				$scope.limparCadastro();
			}
		},function (error){
			$scope.message = "Não foi possível excluir o venda :(";
		});
	};

	$scope.limparCadastro = function (){
		$scope.limparItem();
		delete $scope.venda;
		$scope.vendaForm.$setPristine();
	};


	$scope.incluirItem = function (item){
		if(!$scope.venda){
			$scope.venda = {};
		}
		if(!$scope.venda.itens){
			$scope.venda.itens = [];
		}
		$scope.venda.itens.push(angular.copy(item));
		$scope.limparItem();
	};

	$scope.removerItem = function (item){
		$scope.venda.itens.splice($scope.venda.itens.indexOf(item),1);
	};

	$scope.limparItem = function (){
		delete $scope.item;
		$scope.itemForm.$setPristine();
	};

	$scope.vinhoSelecionado = function (vinho){
		var peso = 0;
		var valor = 0;
		if(vinho){
			peso = $scope.item.vinho.peso;
			valor = $scope.item.vinho.precoSugerido;
		} 
		$scope.item.valorUnitario = valor;
		$scope.item.pesoVinho = peso;
	};

	carregarVendas();
	carregarClientes();
	carregarVinhos();
});