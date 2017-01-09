angular.module("softvinho").factory("clientesAPI", function ($http, config){
	var _getClientes = function () {
		return $http.get(config.baseUrl+"/cliente");
	};

	var _saveCliente = function (cliente) {
		return $http.put(config.baseUrl+"/cliente/save",cliente);
	};

	var _deleteCliente = function (cliente) {
		return $http.delete(config.baseUrl+"/cliente/delete/"+cliente.id);
	};

	return {
		getClientes: _getClientes, 
		saveCliente: _saveCliente,
		deleteCliente: _deleteCliente
	};
});