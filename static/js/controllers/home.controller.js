(function() {
    'use strict';

    angular
        .module('ccihApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'BacteriaService', '$mdToast'];
    function HomeController(UserService, $rootScope, BacteriaService, $mdToast) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function(user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function(users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.delete(id)
                .then(function() {
                    loadAllUsers();
                });
        }

        vm.bacteriaSetup = function (event) {
            BacteriaService.ShowForm();
        }

    }
})();
