(function() {
    'use strict';

    angular
        .module('ccihApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
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
            .when('/cadastro/bacteria' {
                controller: 'BacteriaController',
                templateUrl: 'views/bacteria.view.html',
                controllerAs: 'vm'
            })
            .when('/cadastro/setor' {
                controller: 'SetorController',
                templateUrl: 'views/setor.view.html',
                controllerAs: 'vm'
            })
            .when('/cadastro/material' {
                controller: 'MaterialController',
                templateUrl: 'views/material.view.html',
                controllerAs: 'vm'
            })
            .when('/cadastro/antibiotico' {
                controller: 'AntibioticoController',
                templateUrl: 'views/antibiotico.view.html',
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
    }
})();
