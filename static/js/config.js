(function() {
    'use strict';

    angular
        .module('ccihApp')
        .config(config);

    config.$inject = ['$routeProvider', '$rootScope'];
    function config($routeProvider, $rootScope) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'views/home.view.html',
                controllerAs: 'vm'
            })
            .when('/login' {
                controller: 'LoginController',
                templateUrl: 'views/login.view.html',
                controllerAs: 'vm'
            })
            .when('/cadastro/perfil' {
                controller: 'PerfilController',
                templateUrl: 'views/perfil.view.html',
                controllerAs: 'vm'
            })
            .when('/contabilizacao' {
                controller: 'ContabilizacaoController',
                templateUrl: 'views/contabilizacao.view.html',
                controllerAs: 'vm'
            })
            .when('/grafico' {
                controller: 'GraficoController',
                templateUrl: 'views/grafico.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/login' });
            
        $rootScope.urlBase = 'http://localhost:3000';
    }
})();
