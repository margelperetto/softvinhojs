angular.module("softvinho").controller("cadastroVendaCtrl",function ($scope, $window, vendasAPI, clientesAPI, vinhosAPI, freteAPI, errorAPI){

	$scope.vendas = [];
	$scope.vinhos = [];
	$scope.clientes = [];
	
	var carregarVendas = function () {
		vendasAPI.getVendas()
		.then(function (sucess) {
			$scope.vendas = sucess.data;
		},function (error){
			$scope.message = errorAPI.configMsgError("Listar vendas",error);
		});
	};

	var carregarClientes = function () {
		clientesAPI.getClientes()
		.then(function (sucess) {
			$scope.clientes = sucess.data;
		},function (error){
			$scope.message = errorAPI.configMsgError("Listar clientes",error);
		});
	};

	var carregarVinhos = function () {
		vinhosAPI.getVinhos()
		.then(function (sucess) {
			$scope.vinhos = sucess.data;
		},function (error){
			$scope.message = errorAPI.configMsgError("Listar vinhos",error);
		});
	};

	$scope.salvarVenda = function (venda){
		vendasAPI.saveVenda(venda)
		.then(function (sucess) {
			carregarVendas();
			$scope.limparCadastro();
		},function (error){
			$scope.message = errorAPI.configMsgError("salvar venda",error);
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
			$scope.message = errorAPI.configMsgError("Remover venda",error);
		});
	};

	$scope.limparCadastro = function (){
		$scope.limparItem();
		delete $scope.venda;
		delete $scope.message;
		$scope.vendaForm.$setPristine();
	};


	$scope.incluirItem = function (item){
		if(!$scope.venda){
			$scope.venda = {};
		}
		if(!$scope.venda.itens){
			$scope.venda.itens = [];
		}
		item.pesoTotalItem = item.quantidade * item.pesoVinho;
		$scope.venda.itens.push(angular.copy(item));
		$scope.limparItem();
		$scope.calcularPesoTotal();
	};

	$scope.removerItem = function (item){
		$scope.venda.itens.splice($scope.venda.itens.indexOf(item),1);
		$scope.calcularPesoTotal();		
	};

	$scope.calcularPesoTotal = function (){
		var pesoTotal = 0;
		if($scope.venda && $scope.venda.itens){
			$scope.venda.itens.forEach(function (item){
				pesoTotal += item.pesoTotalItem;
			});
		}
		$scope.venda.pesoTotal = pesoTotal;
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

	$scope.simularFrete = function (){
		freteAPI.calcularFrete($scope.venda.distancia,$scope.venda.pesoTotal)
		.then(
			function (success){
				$scope.venda.totalFrete = success.data;
			}, function (error){
				$scope.message = errorAPI.configMsgError("Calcular frete",error);
			}
		);
	};	

	carregarVendas();
	carregarClientes();
	carregarVinhos();
});