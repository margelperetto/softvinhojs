angular.module("softvinho").provider("freteAPI", function (config){
	
	this.$get = function ($http) {
		return {
			calcularFrete: function (distancia, peso){
				return $http.get(config.baseUrl+"/venda/calcular_frete/"+distancia+"/"+peso);
			}
		};
	};
});