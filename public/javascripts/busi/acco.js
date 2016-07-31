var app = angular.module('acco',['ui.bootstrap', 'ui.router'])
app.controller('searchController', ['$http', '$q', function ($http, $) {

}]);

app.service('accosService', ['$http', '$q', function ($http, $q) {
  this.getAll = function () {
    var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行

  }
}]);

app.directive('', []);
