(function () {
	'use strict';

	angular
		.module('ccihApp')
		.controller('BacteriaController', BacteriaController);

	BacteriaController.$inject = ['BacteriaService', '$mdDialog', 'ToastService'];
	function BacteriaController(BacteriaService, $mdDialog, ToastService) {
		vm = this;
		vm.grams = ['P','N'];
		vm.bacterias = {};
		vm.editable = false;

		vm.save = function() {
			BacteriaService.SaveBacteria(vm.bacteria)
				.then(function(result) {
					ToastService.Success('Bactéria criada com sucesso!');
					vm.getBacterias();
				})
				.error(function(result) {
					ToastService.Error('Erro criando bactéria.');
				});
		};

		vm.cancel = function() {
			$mdDialog.cancel();
		}

		vm.getBacterias = function() {
			BacteriaService.GetBacterias()
				.then(function(data) {
					vm.bacterias = data.bacterias;
				});
		}

		vm.edit = function() {
			if (vm.editable) {
				BacteriaService.UpdateBacteria(vm.bacteria);
			}
			vm.editable = !vm.editable;
		}

		vm.getBacterias();
	}
})