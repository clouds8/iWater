angular.module('water.controllers', ['ui.router', 'ui.bootstrap', 'water.service', 'water.directives'])
.controller('sidebarController', ['$scope', '$http', 'sidebarService', function ($scope, $http, sidebarService) {
  $scope.$on('reqForAuth', function (event, params) {
    sidebarService.getAuths().then(function successCallback(response) {
      $scope.$broadcast('menuNode', response.data);
    });
  });
}])
.controller('accoController', ['$scope', '$http', function ($scope, $http) {
  this.name='2333';

}])
