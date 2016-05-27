//Not needed, only to help wtih debugging
'use strict';

angular
	.module("myApp")
	//must include '$scope '
	.controller("myController",["$scope", 
		function($scope)
		{
			var quantity = 3;
			var cost = 5;

			$scope.person = {firstName:'John',lastName:'Doe'};


			$scope.expression = 5 + 5;

			$scope.totalCost = quantity * cost;

			$scope.firstName = "John";

			$scope.lastName = "Doe";
		}
	]);