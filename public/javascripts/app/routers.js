angular.module('water.routers', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('acco', {
        url: '/acco',
        templateUrl: '/router/acco',
        controller: 'accoController',
        controllerAs: 'acco'
      })
      .state('auths', {
        url: '/auths',
        templateUrl: '/router/auths',
        controller: 'authController',
        controllerAs: 'auth'
      })
      .state('init', {
        url: '/',
        templateUrl: '/router/init'
      })
      .state('footer', {
        url: '/footer',
        templateUrl: '/router/footer'
      })
  });
