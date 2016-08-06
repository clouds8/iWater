angular.module('water.service', [])
.factory('sidebarService', function ($http) {
  var auths = {}
  return {
    getAuths: function () {
      return $http.get('system/auths');
    }
  }
})

.factory('authService', function ($http) {
  return {
    postAuth: function (auth) {
      return $http.post('system/auths', auth)
    },
    deleteAuth: function (authID) {
      return $http.delete('system/auths/' + authID);
    },
    updateAuth: function (auth) {
      return $http.put('system/auths/' + auth._id, auth);
    }
  }
})
