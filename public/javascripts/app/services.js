angular.module('water.service', [])
.factory('sidebarService', function ($http) {
  var auths = {}
  return {
    getAuths: function () {
      return $http.get('ts/auth');
    }
  }
});
