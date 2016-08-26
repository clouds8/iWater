var app = angular.module('dashboard', ['ui.bootstrap', 'ui.router']);

app.controller('menuController', ['$scope', '$http', function ($scope, $http) {
  $scope.$on('reqForAuth', function (event, params) {
    $http.get('http://localhost:3000/ts/auth').then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.data = response.data;
      console.log($scope.data);
      $scope.$broadcast('menuNode', $scope.data);
      }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  });
}]);

app.directive('menu', [function ($scope) {
  return {
    require: '?ngModel',
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
          console.log('未有权限');
        } else {
          var len = result.length;
          // console.log(len);
          // while(len--) {
          //   if (result[len].parentID) {
          //     // result[len]. = result[len].href;
          //     console.log(result[len].parentID);
          //     console.log(result[len].href);
          //     var uiself2 = 'ui-self';
          //     result[len].uiself2 = result[len].href;
          //     console.log(result[len].uiself2);
          //   } else {
          //     // continute;
          //   }
          // }
          var nodes = $.fn.zTree._z.data.transformTozTreeFormat(setting, result);
          element.treeview({data: nodes});
        }
      });

    }
  }
}]);
