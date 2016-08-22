angular.module('water.controllers', ['ui.router', 'ui.bootstrap', 'ui.select', 'ngSanitize', 'water.service', 'water.directives'])

.controller('rootController', ['$scope', function ($scope) {
  $scope.$on('updateSideBar', function (event, params) {
    $scope.$broadcast('reqForAuth');
  });
}])

//模板页左侧导航栏的控制器
.controller('sidebarController', ['$scope', 'sidebarService', function ($scope, sidebarService) {
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
  // $scope.animationsEnabled = true;
  $scope.toBeSelectedParentAuths = null;
  $scope.$on('reqAuthTable', function (event, params) {
    authService.getAuths()
    .then(function (result) {
      $scope.toBeSelectedParentAuths = result.data;
      $scope.$broadcast('resAuthTable', result.data);
    })
    .catch(function (err) {
      console.error(err);
    });
  });
  $scope.open = function (authSelected) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'modalContent.html',
      controller: 'authModalController',
      controllerAs: 'authModalCtrl',
      resolve: {
        authSelected: function () {
          return authSelected;
        },
        toBeSelectedParAuth: function () {
          return authService.getAuths();
        }
      }
    });
    modalInstance.result.then(function (auth) {
      $scope.selected = auth;
      authService.postAuth($scope.selected)
      .then(function (result) {
        // console.log(result);
        $scope.$broadcast('refleshAuthTable');
        $scope.$emit('updateSideBar');
      })
      .catch(function (reason) {
        console.error(reason);
      });
    })
    .catch(function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

}])

//权限管理模态窗口的控制器
.controller('authModalController', ['$scope', '$uibModalInstance',
'authSelected', 'toBeSelectedParAuth','authService',
function ($scope, $uibModalInstance, authSelected, toBeSelectedParAuth, choosenParAuths,authService) {
  var vm = this;
  this.auth = authSelected;
  this.toBeSelected = null;
  this.choosenParAuths = toBeSelectedParAuth.data;
  if (this.auth) {
    this.title = "编辑权限";
  } else {
    this.title = "新建权限";
  }

  // vm.selectParentAuth = function () {
  //   authService.getAuths()
  //     .then(function (result) {
  //       this.toBeSelected = result.data;
  //       $scope.toBeSelected = result.data;
  //       vm.choosenParAuths = result.data;
  //       vm.choosenParAuths.pop();
  //       console.log(this.toBeSelected);
  //       console.log($scope.toBeSelected);
  //       console.log(vm.choosenParAuths);
  //     })
  //     .catch(function (err) {
  //     })
  // }

  this.ok = function () {
    $uibModalInstance.close(this.auth);
  };

  this.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  // if (authSelected) {
  //   this.auth = authSelected;
  // } else {
  //   this.auth = {};
  // }
}])

//角色管理页面的控制器
.controller('roleController', ['$scope', '$uibModal', 'roleService', function ($scope, $uibModal, roleService) {

  //给指令传送角色数据
  $scope.$on('reqRoleTable', function (event, params) {
    roleService.getRoles()
    .then(function (result) {
      $scope.$broadcast('resRoleTable', result.data);
    })
    .catch(function (err) {
      console.error(err);
    });
  });


  $scope.open = function (roleSelected) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'modalContent.html',
      controller: 'roleModalController',
      controllerAs: 'roleModalCtrl',
      resolve: {
        roleSelected: function () {
          return roleSelected;
        }
      }
    });

    modalInstance.result
    .then(function (role) {
      $scope.selected = role;
      roleService.postRole($scope.selected = role)
      .then(function (result) {
        $scope.$broadcast('refleshRoleTable');
      })
      .catch(function (reason) {
        console.error(reason);
        //TODO: deal with the err
        return({"error": reason});
      });
    })
    .catch(function (error) {
      console.log('Modal dismissed at: ' + new Date());
    });

  };//- end open

}])


//角色管理模态窗口的控制器
.controller('roleModalController', ['$scope', '$uibModalInstance',
'roleSelected', 'roleService',
function ($scope, $uibModalInstance, roleSelected, roleService) {

  this.role = roleSelected;
  if (this.role) {
    this.title = "编辑角色";
  } else {
    this.title = "新建角色";
  }


  this.ok = function () {
    //TODO 广播获取权限数据信号，监听反馈的事件，then中close模态窗
    $uibModalInstance.close(this.role);
  };

  this.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}])



//角色管理页面的控制器
.controller('userController', ['$scope', '$uibModal', 'userService', 'roleService',
function ($scope, $uibModal, userService, roleService) {

  $scope.open = function (userSelected) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'modalContent.html',
      controller: 'userModalController',
      controllerAs: 'userModalCtrl',
      resolve: {
        userSelected: function () {
          return userSelected;
        },
        rolesToBeselected: function () {
          return roleService.getRoles({size:0});
        }
      }
    });

    modalInstance.result
    .then(function (user) {
      $scope.selected = user;
      var addOrUpdate = null;

      if (user._id) {

        addOrUpdate = userService.updateUser;

      } else {

        addOrUpdate = userService.postUser;

      }

      addOrUpdate($scope.selected)
      .then(function (result) {
        $scope.$broadcast('refleshUserTable');
        console.log('refleshUserTable');
      })
      .catch(function (reason) {
        console.error(reason);
        //TODO: deal with the err
        return({"error": reason});
      });

    })
    .catch(function (error) {
      console.log('Modal dismissed at: ' + new Date());
    });


  };

}])


//
.controller('userModalController', ['$scope', '$uibModalInstance', 'userSelected', 'rolesToBeselected', function ($scope, $uibModalInstance, userSelected, rolesToBeselected) {
  this.user = userSelected;
  if (this.user) {
    this.title = "编辑用户";
  } else {
    this.title = "新建用户";
  }

  this.rolesToBeselected = rolesToBeselected.data.rows;

  this.ok = function () {
    $uibModalInstance.close(this.user);
  };

  this.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}])
