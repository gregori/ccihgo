(function() {
	'use strict',

	angular
		.module('ccihApp')
		.factory('BacteriaService', BacteriaService);

		BacteriaService.$inject = ['$mdDialog','$http'];

		function BacteriaService ($mdDialog, $http) {
			var service = {};

			service.ShowForm = ShowForm;
			service.SaveBacteria = SaveBacteria;
			service.UpdateBacteria = UpdateBacteria;
			service.DeleteBacteria = DeleteBacteria;
			service.GetAllBacterias = GetAllBacterias;
			service.GetBacteria = GetBacteria;

			return service;

			function ShowForm (event) {
				return $mdDialog.show({
					controller: BacteriaController,
					templateUrl: 'views/bacteria.view.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsiteToClose: false,
				});
			}

			function SaveBacteria (bacteria) {
				return $http.post($rootScope.urlBase + '/bacterias', bacteria);
			}

			function UpdateBacteria (bacteria) {
				return $http.put($rootScope.urlBase + '/bacterias/' + bacteria.id, bacteria);
			}

			function DeleteBacteria (id) {
				return $http.delete($rootScope.urlBase + '/bacterias/' + id);
			}

			function GetAllBacterias (bacteria) {
				return $http.get($rootScope.urlBase + '/bacterias');
			}

			function GetBacteria (id) {
				return $http.get($rootScope.urlBase + '/bacterias/' + id);
			}

		}