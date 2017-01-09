angular.module("softvinho").service("vinhosAPI", function ($http, config){
	this.getVinhos = function () {
		return $http.get(config.baseUrl+"/vinho");
	};

	this.saveVinho = function (vinho) {
		return $http.put(config.baseUrl+"/vinho/save",vinho);
	};

	this.deleteVinho = function (vinho) {
		return $http.delete(config.baseUrl+"/vinho/delete/"+vinho.id);
	};
});