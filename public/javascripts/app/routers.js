angular.module('water.routers', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('acco', {
        url: '/acco',
        templateUrl: '/acco',
        controller: 'accoController',
        controllerAs: 'acco'
      })
      .state('auths', {
        url: '/auths',
        templateUrl: '/auths'
        // templateUrl: '/router/auths',
        // controller: 'authController',
        // controllerAs: 'auth'
      })
      .state('roles', {
        url: '/roles',
        templateUrl: '/roles'
        // templateUrl: '/router/roles',
        // controller: 'roleController',
        // controllerAs: 'role'
      })
      .state('users', {
        url: '/users',
        templateUrl: '/users'
      })
      .state('init', {
        url: '/',
        templateUrl: '/init'
      })
      .state('footer', {
        url: '/footer',
        templateUrl: '/footer'
      })
  });
