angular.module('water.directives', [])
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

.directive('authtable', [function ($scope) {
  return {
    restrict: 'A',
    // controller: 'authController',
    link: function ($scope, element, atts, ngModel) {
      var queryParams = function (params) {
        return {
          // custName: encodeURI($.trim($("#custName").val())),
          // custName: encodeURI($.trim('张志欢1')),
          //- custName: $("#custName"),
          // offset: params.pageNumber,
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

// .directive('accotable', [function ($scope) {
//   console.log('~~##~~');
//   return {
//     restrict: 'A',
//     controller: 'accoController',
//     link: function ($scope, element, atts, ngModel) {
//       console.log('%%%%');
//       (function(){
//         //初始化Table
//         var accoTable = new TableInit();
//         accoTable.Init();
//       });
//       var TableInit = function () {
//         var oTableInit = new Object();
//         oTableInit.Init = function () {
//           element.bootstrapTable({
//             url: 'http://localhost:3000/business/accos',
//             pagination: true,
//             sortable: true,
//             striped: true,
//             sidePagination: 'server',
//             pageList: [5, 10, 25, 50 ,100],
//             queryParams: oTableInit.queryParams,
//             silentSort: false,
//             //列设置
//             columns: [{
//               field: 'custName',
//               title: '姓名'
//             }, {
//               field: 'custID',
//               title: '客户编码'
//             }, {
//               field: 'meterID',
//               title: '水表编码'
//             }, {
//               field: 'Freq',
//               title: '区段'
//             }, {
//               field: 'addre',
//               title: '安装地址'
//             }, {
//               field: 'operation',
//               title: '操作',
//               formatter: oTableInit.actionFormatter,
//               events: operateEvents
//             }]
//           });
//         }
//         oTableInit.queryParams = function (params) {
//           return {
//             custName: encodeURI($.trim($("#custName").val())),
//             // custName: encodeURI($.trim('张志欢1')),
//             //- custName: $("#custName"),
//             // offset: params.pageNumber,
//             //
//             offset: params.offset,
//             limit: params.limit,
//             sort: params.sort,
//             order: params.order
//           }
//         }
//         oTableInit.actionFormatter = function (value, row, index) {
//           return [
//             '<a class="edit" href="javascript:void(0)" title="Edit"',
//             '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>',
//             '</a>',
//             '<a class="remove" href="javascript:void(0)" title="Remove" >',
//             '<i class="fa fa fa-times" aria-hidden="true"></i>',
//             '</a>'
//           ].join('');
//         }
//         window.operateEvents = {
//           'click .edit': function (e, value, row, index) {
//             alert('You click edit action, row: ' + JSON.stringify(row));
//           },
//           'click .remove': function (e, value, row, index) {
//             // $table.bootstrapTable('remove', {
//             //     field: 'id',
//             //     values: [row.id]
//             // });
//             alert('You click remove action, row: ' + JSON.stringify(row));
//           }
//         }
//         return oTableInit;
//       }
//     }
//   }
// }])
