angular.module("softvinho").directive("uiCapitalize",function ($filter){
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {
			element.css("text-transform","capitalize");
		}
	};
});