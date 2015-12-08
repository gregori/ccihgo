(function () {
	'use strict';

	angular
		.module('ccihApp')
		.factory('ToastService', ToastService);

	ToastService.$inject = ['$rootScope', '$mdToast'];
	function ToastService ($rootScope, $mdToast) {
		var service = {};

		service.Success = Success;
		service.Error = Error;

		return service;

        function showToast(type, text) {
            $mdToast.show({
                template: '<md-toast class="md-toast' + type + '">' + text + '</md-toast>',
                hideDelay: 6000,
                position: 'top right'
               
            });
        };

		function Success(message) {
			showToast('success', message);
		}

		function Error(message) {
			showToast('error', message);
		}
	}
})