angular.module("softvinho").service("vendasAPI", function ($http, config){
	this.getVendas = function () {
		return $http.get(config.baseUrl+"/venda");
	};

	this.saveVenda = function (venda) {
		return $http.put(config.baseUrl+"/venda/save",venda);
	};

	this.deleteVenda = function (venda) {
		return $http.delete(config.baseUrl+"/venda/delete/"+venda.id);
	};
});