angular.module('water.controllers', ['ui.router', 'ui.bootstrap', 'water.service', 'water.directives'])

//模板页左侧导航栏的控制器
.controller('sidebarController', ['$scope', '$http', 'sidebarService', function ($scope, $http, sidebarService) {
  $scope.$on('reqForAuth', function (event, params) {
    sidebarService.getAuths().then(function successCallback(response) {
      $scope.$broadcast('menuNode', response.data);
    });
  });
}])

//模板页内容区的控制器
.controller('contentController', ['$scope', function ($scope) {
//TODO
}])
//开户管理页面的控制器
.controller('accoController', ['$scope', function ($scope) {

}])

//权限管理页面的控制器
.controller('authController', ['$scope', '$uibModal', 'authService', function ($scope, $uibModal, authService) {
  $scope.animationsEnabled = true;
  $scope.open = function (authSelected) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'modalContent.html',
      controller: 'authModalController',
      controllerAs: 'authModalCtrl',
      resolve: {
        authSelected: function () {
          return authSelected;
        }
      }
    });
    modalInstance.result.then(function (auth) {
      $scope.selected = auth;
      authService.postAuth($scope.selected).then(function successCallback(result) {
        console.log(result);
        $scope.$broadcast('refleshAuthTable');
      }, function errorCallback(reason) {
        console.error(reason);
      })
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

}])

//权限管理模态窗口的控制器
.controller('authModalController', ['$scope', '$uibModalInstance' , 'authSelected', function ($scope, $uibModalInstance, authSelected) {
  this.auth = authSelected;

  if (this.auth) {
    this.title = "编辑权限";
  } else {
    this.title = "新建权限";
  }
  this.ok = function () {
    $uibModalInstance.close(this.auth);
  }

  this.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }
  // if (authSelected) {
  //   this.auth = authSelected;
  // } else {
  //   this.auth = {};
  // }
}])
