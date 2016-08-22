angular.module('water.directives', ['water.service'])
//侧边栏导航树结构生成
.directive('sidebar', ['sidebarService', '$state', function (sidebarService, $state) {
  return {
    restrict: 'A',
    link: function ($scope, element, atts, ngModel) {
      var setting = {
        data: {
          key: {
            children: "nodes",
            name: "text",
          },
          simpleData: {
            idKey: "_id",
            pIdKey: "parentID",
            rootPId: null
          }
        }
      };

      $scope.$emit('reqForAuth');
      $scope.$on('menuNode', function (event, result) {
        if (!result) {
          alert('未有权限');
        } else {
          // var len = result.length;
          var nodes = $.fn.zTree._z.data.transformTozTreeFormat(setting, result);
          element.treeview({
            data: nodes,
            showBorder: false,
            enableLinks: false
          });
          element.treeview('expandAll', { levels:2, silent:true });
          element.on('nodeSelected', function (event, data) {
            if (data.href) {
              $state.go(data.href);
            }
          });
        }
      });
    } //- end link
  };//- end return
}])//- end sidebarDirective

//开户管理，生成列表
.directive('accotable', [function ($scope) {
  return {
    restrict: 'A',
    controller: 'accoController',
    link: function ($scope, element, atts, ngModel) {
      var queryParams = function (params) {
        return {
          custName: encodeURI($.trim($("#custName").val())),
          // custName: encodeURI($.trim('张志欢1')),
          //- custName: $("#custName"),
          // offset: params.pageNumber,
          //
          offset: params.offset,
          limit: params.limit,
          sort: params.sort,
          order: params.order
        };
      };

      // 操作列事件定义
      var actionFormatter = function (value, row, index) {
        return [
          '<a class="edit" href="javascript:void(0)" title="Edit">',
          '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>',
          '</a>',
          '<a class="remove" href="javascript:void(0)" title="Remove">',
          '<i class="fa fa fa-times fa-fw" aria-hidden="true"></i>',
          '</a>'
        ].join(' ');
      };

      // 操作列事件监听定义
      window.operateEvents = {
        'click .edit': function (e, value, row, index) {
          alert('You click edit action, row: ' + JSON.stringify(row));
        },
        'click .remove': function (e, value, row, index) {
          // $table.bootstrapTable('remove', {
          //     field: 'id',
          //     values: [row.id]
          // });
          alert('You click remove action, row: ' + JSON.stringify(row));
        }
      };


      element.bootstrapTable({
        url: 'api/accos',
        // url: 'http://localhost:3000/business/accos',
        pagination: true,
        sortable: true,
        striped: true,
        sidePagination: 'server',
        pageList: [5, 10, 25, 50 ,100],
        queryParams: queryParams,
        // iconsPrefix: 'fa',
        silentSort: false,
        //列设置
        columns: [{
          field: 'custName',
          title: '姓名'
        }, {
          field: 'custID',
          title: '客户编码'
        }, {
          field: 'meterID',
          title: '水表编码'
        }, {
          field: 'Freq',
          title: '区段'
        }, {
          field: 'addre',
          title: '安装地址'
        }, {
          field: 'operation',
          title: '操作',
          formatter: actionFormatter,
          events: operateEvents
        }]
      });
    }//- end link
  };//- end return
}])//- end accoDirective

//权限管理，生成列表
//由于数据量少，权限的表格数据采取客户端分页的方式，并且将子权限嵌套到父权限的子表格中
.directive('authtable', ['$window', 'authService' , 'sidebarService', function ($window, authService, sidebarService) {
  return {
    restrict: 'A',
    // scope: {
    //   open: '&open'
    // },
    // controller: 'authController',
    // controllerAs: 'auth',
    link: function ($scope, element, atts, ngModel) {
      var nodes = null;
      var actionFormatter = function (value, row, index) {
        return [
          '<a class="edit" href="javascript:void(0)" title="Edit" ng-click="open()">',
          '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>编辑',
          '</a>',
          '<a class="detail" href="javascript:void(0)" title="Detail" ng-click="">',
          '<i class="fa fa fa-info fa-fw" aria-hidden="true"></i>信息',
          '</a>',
          '<a class="remove" href="javascript:void(0)" title="Remove" ng-click="">',
          '<i class="fa fa fa-times fa-fw" aria-hidden="true"></i>删除',
          '</a>'
        ].join(' ');
      };

      //权限管理的操作事件
      $window.operateEvents = {
        'click .edit': function (e, value, row, index) {
          $scope.open(row);
        },
        'click .detail': function (e, value, row, index) {
          alert('You click detail action, row: ' + JSON.stringify(row));
        },
        'click .remove': function (e, value, row, index) {

          // 采用sweetAlert对删除进行确认
            swal({
              title: "Are you sure ?",
              text: "You will not be able to recover this imaginary file!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
            }, function functionName() {
              var selectedID = [];
              selectedID.push(row._id);

              authService.deleteAuth(row._id).then(function successCallback() {

                //如果是子权限页面则重新生成表格
                //（因为bootstraptable删除subTable行非常麻烦）
                //如果是根目录页面则直接remove表格行，并且更新侧边栏。
                if (row.parentID) {
                  element.bootstrapTable('destroy');
                  $scope.$emit('reqAuthTable');
                } else {
                  element.bootstrapTable('remove', {
                    field: '_id',
                    values: selectedID
                  });

                }

                //删除权限数据后刷新侧边权限导航栏
                $scope.$emit('updateSideBar');

                swal("Deleted", "You have Deleted the item.", "success");

              }, function errorCallback() {
                swal("Failed","Fail to delete", "error");
              });

            });
        }
      };//- end window.operateEvents

      // 权限数据转换设置 （参考ztree的转换方法）
      var setting = {
        data: {
          key: {
            children: "nodes",
            name: "text",
          },
          simpleData: {
            idKey: "_id",
            pIdKey: "parentID",
            rootPId: null
          }
        }
      };

      //列设置
      var columnsTempl = [
        {
          field: '_id',
          title: '权限ID',
          // visible: false,
        }, {
          field: 'text',
          title: '权限名称'
        }, {
          field: 'parentName',
          title: '父权限节点'
        }, {
          field: 'href',
          title: '链接地址'
        }, {
          field: 'icon',
          title: '权限图标类名'
        }, {
          field: 'order',
          title: '排序值'
        }, {
          field: 'operation',
          title: '操作',
          formatter: actionFormatter,
          events: $window.operateEvents
        }
      ];

      $scope.$emit('reqAuthTable');
      $scope.$on('resAuthTable', function (event, result, params) {
        nodes = $.fn.zTree._z.data.transformTozTreeFormat(setting, result);
        //创建表格
        element.bootstrapTable({
          // url: 'api/auths',
          data: nodes,   //从data中加载表格数据
          pagination: true,
          sortable: true,
          striped: true,
          search: true,
          searchAlign: "right",
          showColumns: true,
          showRefresh: true,
          toolbar: "#toolbar",
          sidePagination: 'client',
          pageList: [10, 25, 50 ,100],
          detailView: true,
          // iconsPrefix: 'fa',
          columns: columnsTempl,
          onExpandRow: function (index, row, $detail) {
            $detail.html('<table></table>').find('table').bootstrapTable({
              columns: columnsTempl,
              data: row.nodes,
              // detailView: row.nodes !== 'undefined',
              detailView: row.nodes? true:false ,
              onExpandRow: function (indexSub, rowSub, $detailSub) {
                $detailSub.html('<table></table>').find('table').bootstrapTable({
                  columns: columnsTempl,
                  data: rowSub.nodes,
                  detailView: rowSub.nodes? true:false
                });
              }
            });
          }
        });

        // $scope.$emit('updateSideBar');
      });


      $scope.$on('refleshAuthTable', function (event, result) {
        // element.bootstrapTable('refresh', {silent: true});
        element.bootstrapTable('destroy');
        $scope.$emit('reqAuthTable');
      });

    }
  };
}])

/*
//权限管理，生成列表 (备份)
.directive('authtable', ['$window', 'authService' ,function ($window, authService) {
  return {
    restrict: 'A',
    // scope: {
    //   open: '&open'
    // },
    // controller: 'authController',
    // controllerAs: 'auth',
    link: function ($scope, element, atts, ngModel) {
      var actionFormatter = function (value, row, index) {
        return [
          '<a class="edit" href="javascript:void(0)" title="Edit" ng-click="open()">',
          '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>',
          '</a>',
          '<a class="detail" href="javascript:void(0)" title="Detail" ng-click="">',
          '<i class="fa fa fa-info fa-fw" aria-hidden="true"></i>',
          '</a>',
          '<a class="remove" href="javascript:void(0)" title="Remove" ng-click="">',
          '<i class="fa fa fa-times fa-fw" aria-hidden="true"></i>',
          '</a>'
        ].join('');
      }

      //权限管理的操作事件
      $window.operateEvents = {
        'click .edit': function (e, value, row, index) {
          // alert('You click edit action, row: ' + JSON.stringify(row));
          // $scope.apply(open(row));
          // $scope.$apply($scope.$parent.open(row));
          // $scope.$parent.open(row);
          $scope.open(row);
        },
        'click .detail': function (e, value, row, index) {
          // alert('You click detail action, row: ' + JSON.stringify(row));
          alert('You click detail action, row: ' + JSON.stringify(row));
        },
        // 'click .remove': function (e, value, row, index) {
        //   var  selectedID = [];
        //   selectedID.push(row._id);
        //   element.bootstrapTable('remove', {
        //     field: '_id',
        //     values: selectedID
        //   });
        //   authService.deleteAuth(row._id).then(function successCallback(result) {
        //     console.log('delete done:');
        //     console.log(result);
        //   });
        // }
        'click .remove': function (e, value, row, index) {
            swal({
              title: "Are you sure ?",
              text: "You will not be able to recover this imaginary file!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
            }, function functionName() {
              var selectedID = [];
              selectedID.push(row._id);
              element.bootstrapTable('remove', {
                field: '_id',
                values: selectedID
              });
              authService.deleteAuth(row._id).then(function successCallback() {
                swal("Deleted", "You have Deleted the item.", "success")
              }, function errorCallback() {
                swal("Failed","Fail to delete", "error")
              })

            });
        }
      }
      //创建表格
      element.bootstrapTable({
        url: 'api/auths',
        pagination: true,
        sortable: true,
        striped: true,
        search: true,
        searchAlign: "right",
        showColumns: true,
        showRefresh: true,
        toolbar: "#toolbar",
        sidePagination: 'client',
        pageList: [10, 25, 50 ,100],
        columns: [
          {
            field: '_id',
            title: '权限ID',
            // visible: false,
          }, {
            field: 'text',
            title: '权限名称'
          }, {
            field: 'parentID',
            title: '父节点ID'
          }, {
            field: 'href',
            title: '链接地址'
          }, {
            field: 'icon',
            title: '权限图标类名'
          }, {
            field: 'order',
            title: '排序值'
          }, {
            field: 'operation',
            title: '操作',
            // formatter: actionFormatter
            formatter: actionFormatter,
            events: $window.operateEvents
          }
        ]
      });

      $scope.$on('refleshAuthTable', function (event, result) {
        element.bootstrapTable('refresh', {silent: true});
      });

    }
  }
}])
*/


//角色管理
//角色管理采取服务器端分页的方式
//角色中的权限数组在角色的子表格中展示
//搜索栏采用bootstrapTable自带的，只关联角色名。
.directive('roletable', ['$window', 'roleService', function ($window, roleService) {
  return {
    restrict: 'A',
    controller: 'roleController',
    link: function ($scope, element, atts, ngModel) {
      var nodes = null;
      var actionFormatter = function (value, row, index) {
        return [
          '<a class="edit" href="javascript:void(0)" title="Edit">',
          '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>编辑',
          '</a>',
          '<a class="detail" href="javascript:void(0)" title="Detail">',
          '<i class="fa fa fa-info fa-fw" aria-hidden="true"></i>详细',
          '</a>',
          '<a class="remove" href="javascript:void(0)" title="Remove">',
          '<i class="fa fa fa-times fa-fw" aria-hidden="true"></i>删除',
          '</a>'
        ].join(' ');
      };

      $window.operateEvents = {
        //TODO:
        'click .edit': function (e, value, row, index) {
          $scope.open(row);
        },
        'click .detail': function (e, value, row, index) {
          alert('You click detail action, row: ' + JSON.stringify(row));
        },
        'click .remove': function (e, value, row, index) {
          swal({
              title: "Are you sure ?",
              text: "You will not be able to recover this imaginary file!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
            }, function () {
              var selectedID = [];
              selectedID.push(row._id);
              roleService.deleteRole(row._id)
              .then(function () {
                element.bootstrapTable('remove', {
                  field: '_id',
                  values: selectedID
                });
                swal("Deleted", "You have Deleted the item.", "success");
              })
              .catch(function (err) {
                swal("Failed","Fail to delete", "error");
                console.log(err);
              });

            });//- end swal
        }
      };

      var queryParams = function (params) {
        return {
          // roleName : encodeURI(params.search),
          roleName: params.search,
          offset: params.offset,
          limit: params.limit,
          sort: params.sort,
          order: params.order
        };
      };

      var setting = {
        data: {
          key: {
            children: "nodes",
            name: "text"
          },
          simpleData: {
            idKey: "_id",
            pIdKey: "parentID",
            rootPId: null
          }
        }
      };

      var columnsTempl = [
        {
          field: '_id',
          title: '角色ID',
          visible: false
        },
        {
          field: 'roleName',
          title: '角色名称'
        },
        {
          field: 'disabledAlis',
          title: '是否禁用',
        },
        {
          field: 'desc',
          title: '备注'
        },
        {
          field: 'operation',
          title: '操作',
          formatter: actionFormatter,
          events: $window.operateEvents
        }
      ];

      var detailColumnsTempl = [
        {
          field: '_id',
          title: '权限ID'
        },
        {
          field: 'text',
          title: '权限'
        },
        {
          field: 'parentID',
          title: '父权限ID',
          visible: false
        },
        {
          field: 'parentName',
          title: '父权限'
        }
      ];

      element.bootstrapTable({
        url: 'api/roles',
        // data: nodes,
        pagination: true,
        striped: true,
        sortable: true,
        search: true,
        searchAlign: "right",
        showColumns: true,
        showRefresh: true,
        toolbar: "#toolbar",
        sidePagination: 'server',
        searchOnEnterKey: true,
        pageList: [10, 25, 50 ,100],
        detailView: true,
        columns: columnsTempl,
        queryParams: queryParams,
        // checkboxHeader: false,
        onPostBody: function () {
          // 设置查找框的placeholder
          var t = element.data('bootstrap.table');
          if (t) {
            t.$toolbar.find('.search input').attr('placeholder', '角色名称');
            // t['$toolbar'].find('.search input').attr('placeholder', '角色名称');
          }
        },
        onExpandRow: function (index, row, $detail) {
          var detailAuths = $.fn.zTree._z.data.transformTozTreeFormat(setting, row.auths);
          $detail.html('<table></table>').find('table').bootstrapTable({
            columns: detailColumnsTempl,
            data: detailAuths,
            detailView: true,
            onExpandRow: function (indexSub, rowSub, $detailSub) {
              $detailSub.html('<table></table>').find('table').bootstrapTable({
                columns: detailColumnsTempl,
                data: rowSub.nodes,
                detailView: rowSub.nodes? true:false
              });
            }
          });
        }
      });
      // $scope.$on('refleshAuthTable',function (event, result) {
      //   element.bootstrapTable('destroy');
      //   $scope.$emit('reqRoleTable');
      // });
    } //-  end link
  }; //- end return
}])

.directive('roleauthtree', ['authService', function (authService) {
  return {
    restrict: 'A',
    link: function ($scope, element, atts, ngModel) {
      //TODO: 生成权限选择ztree 监控提交数据事件
      var setting = {
        data: {

        }
      };

    }
  };
}])

.directive('usertable', ['$window', 'userService', function ($window, userService) {
  return {
    restrict: 'A',
    controller: 'userController',
    link: function ($scope, element, atts, ngModel) {

      var actionFormatter = function (value, row, index) {
        return [
          '<a class="edit" href="javascript:void(0)" title="Edit">',
          '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>编辑',
          '</a>',
          '<a class="detail" href="javascript:void(0)" title="Detail">',
          '<i class="fa fa fa-info fa-fw" aria-hidden="true"></i>重置密码',
          '</a>',
          '<a class="remove" href="javascript:void(0)" title="Remove">',
          '<i class="fa fa fa-times fa-fw" aria-hidden="true"></i>删除',
          '</a>'
        ].join(' ');
      };

      $window.operateEvents = {
        'click .edit': function (e, value, row, index) {
          $scope.open(row);
        },
        'click .detail': function (e, value, row, index) {
          alert('You click detail action, row: ' + JSON.stringify(row));
        },
        'click .remove': function (e, value, row, index) {

          swal({
            title: "Are you sure ?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

          }, function () {
            //TODO: delete the row
            var selectedID = [];
            selectedID.push(row._id);
            userService.deleteUser(row._id)
            .then(function () {
              element.bootstrapTable('remove', {
                field: '_id',
                values: selectedID
              });
              swal("Deleted", "You have Deleted the item.", "success");
            })
            .catch(function (err) {
              swal("Failed","Fail to delete", "error");
              console.log(err);
            });
          });
        }
      }; //- end the $window.operateEvents

      var queryParams = function (params) {
        return {
          userName: params.search,
          offset: params.offset,
          limit: params.limit,
          sort: params.sort,
          order: params.order
        };
      };

      var columnsTempl = [
        {
          field: '_id',
          title: '用户ID',
          visible: false
        },
        {
          field: 'name',
          title: '用户名称'
        },
        {
          field: 'roles',
          title: '所属角色',
          formatter: function (value, row, index) {
            if (row.roles) {
              var len = row.roles.length;
              var label = [];
              while (len--) {
                var tempHtmlString = '<span class="label label-default">' + row.roles[len].roleName + '</span>';
                label.push(tempHtmlString);
              }
              if (label.length) {
                return label.join(' ');
              } else {
                return '--';
                // return null;
              }

            } else {
              return '--';
            }

          }
        },
        {
          field: 'disabledAlis',
          title: '是否禁用',
        },
        {
          field: 'operation',
          title: '操作',
          formatter: actionFormatter,
          events: $window.operateEvents
        }
      ];



      var createTable = function () {
        element.bootstrapTable({
          url: 'api/users',
          pagination: true,
          striped: true,
          sortable: true,
          search: true,
          searchAlign: "right",
          showColumns: true,
          showRefresh: true,
          toolbar: "#toolbar",
          sidePagination: 'server',
          searchOnEnterKey: true,
          pageList: [10, 25, 50 ,100],
          detailView: false,
          columns: columnsTempl,
          queryParams: queryParams,
          onPostBody: function () {
            // 设置查找框的placeholder
            var t = element.data('bootstrap.table');
            if (t) {
              t.$toolbar.find('.search input').attr('placeholder', '用户名称');
            }
          }

        }); //- end element.bootstrapTable
      }

      createTable();

      $scope.$on('refleshUserTable', function (event, params) {
        element.bootstrapTable('destroy');
        createTable();
      })

    } //-end link

  };//- end return
}])
