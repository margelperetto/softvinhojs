angular.module("softvinho").service("errorAPI", function (){
	
	this.configMsgError = function (msg, error){
		console.log("ERROR CONTROLLER!");
		if(error.status===400){
			return msg+". "+error.status+" - "+error.data;
		}else if(error.status===409){
			return msg+". "+error.status+" - Registro já existe ou esta sendo usado!";
		}else if(error.status===422){
			return msg+". "+error.status+" - Informação não aceita pelo banco de dados!";
		}else if(error.status===500){
			return msg+". "+error.status+" - Erro interno!";
		}else{
			return "Operação: "+msg+". "+error.status+" - "+error.statusText;
		}
	};
	
});