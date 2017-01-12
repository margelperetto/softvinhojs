angular.module("softvinho").controller("cadastroVinhoCtrl",function ($scope, $window, vinhosAPI, errorAPI){

	$scope.vinhos = [];
	$scope.tipos = ["TINTO","BRANCO","ROSADO","ESPUMANTE"];

	var carregarVinhos = function () {
		vinhosAPI.getVinhos()
		.then(function (sucess) {
			$scope.vinhos = sucess.data;
		},function (error){
			$scope.message = errorAPI.configMsgError("Listar vinhos",error);
		});
	};

	$scope.salvarVinho = function (vinho){
		vinhosAPI.saveVinho(vinho)
		.then(function (sucess) {
			carregarVinhos();
			$scope.limparCadastro();
		},function (error){
			$scope.message = errorAPI.configMsgError("Salvar vinho",error);
		});
	};

	$scope.removerVinho = function (vinho){
		vinhosAPI.deleteVinho(vinho)
		.then(function (sucess) {
			$scope.vinhos.splice($scope.vinhos.indexOf(vinho),1);
			if($scope.vinho && $scope.vinho.id === vinho.id){
				$scope.limparCadastro();
			}
		},function (error){
			$scope.message = errorAPI.configMsgError("Remover vinho",error);
		});
	};

	$scope.editarVinho = function (vinho){
		$scope.limparCadastro();
		$scope.vinho = angular.copy(vinho);
		$window.scrollTo(0, 0);
	};

	$scope.limparCadastro = function (){
		delete $scope.vinho;
		delete $scope.message;
		$scope.vinhoForm.$setPristine();
	};
			
	$scope.ordenarPor = function (campo){
		$scope.campoOrdenacao = campo;
		$scope.inverterOrdem = !$scope.inverterOrdem;
	};

	carregarVinhos();
});