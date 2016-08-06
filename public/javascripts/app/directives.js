angular.module('water.directives', ['water.service'])
//侧边栏导航树结构生成
.directive('sidebar', [function ($scope) {
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
      }
      $scope.$emit('reqForAuth');
      $scope.$on('menuNode', function (event, result) {
        if (!result) {
          alert('未有权限');
        } else {
          var len = result.length;
          var nodes = $.fn.zTree._z.data.transformTozTreeFormat(setting, result);
          element.treeview({
            data: nodes,
            showBorder: false,
            enableLinks: true
          });
        }
      });
    }
  }
}])
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
        }
      }

      var actionFormatter = function (value, row, index) {
        return [
          '<a class="edit" href="javascript:void(0)" title="Edit">',
          '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>',
          '</a>',
          '<a class="remove" href="javascript:void(0)" title="Remove">',
          '<i class="fa fa fa-times fa-fw" aria-hidden="true"></i>',
          '</a>'
        ].join('');
      }

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
      }


      element.bootstrapTable({
        url: 'business/accos',
        // url: 'http://localhost:3000/business/accos',
        pagination: true,
        sortable: true,
        striped: true,
        sidePagination: 'server',
        pageList: [5, 10, 25, 50 ,100],
        queryParams: queryParams,
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
    }
  }
}])

//权限管理，生成列表
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
        url: 'system/auths',
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
/*
.directive('authtable', [function ($scope) {
  return {
    restrict: 'A',
    // controller: 'authController',
    link: function ($scope, element, atts, ngModel) {
      // var queryParams = function (params) {
      //   return {
      //     offset: params.offset,
      //     limit: params.limit,
      //     sort: params.sort,
      //     order: params.order
      //   }
      // }

      var actionFormatter = function (value, row, index) {
        return [
          '<a class="edit" href="javascript:void(0)" title="Edit">',
          '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>',
          '</a>',
          '<a class="remove" href="javascript:void(0)" title="Remove">',
          '<i class="fa fa fa-times fa-fw" aria-hidden="true"></i>',
          '</a>'
        ].join('');
      }

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
      }


      element.bootstrapTable({
        url: 'router/auths',
        pagination: true,
        sortable: true,
        striped: true,
        sidePagination: 'client',
        pageList: [10, 25, 50 ,100],
        // queryParams: queryParams,
        silentSort: false,
        //列设置
        columns: [
        //   {
        //   field: '_id',
        //   title: 'ID'
        // },
        {
          field: 'text',
          title: '权限名称'
        }, {
          field: 'href',
          title: '链接地址'
        }, {
          field: 'icon',
          title: '权限图标类名'·
        }, {
          field: 'order',
          title: '排序值'
        }, {
          field: 'operation',
          title: '操作',
          formatter: actionFormatter,
          events: operateEvents
        }]
      });
    }
  }
}])
*/
