angular.module('water.service', [])
.factory('sidebarService', function ($http) {
  var auths = {};
  var neededRefleshed = false;
  return {
    getAuths: function () {
      return $http.get('api/auths');
    },
    getNeededRefleshed: function () {
      return neededRefleshed;
    },
    setNeededRefleshed: function (value) {

      if (value) {
        neededRefleshed = true;
      } else {
        neededRefleshed = false;
      }
    }
  };
})

.factory('authService', function ($http) {
  return {
    postAuth: function (auth) {
      return $http.post('api/auths', auth);
    },
    deleteAuth: function (authID) {
      return $http.delete('api/auths/' + authID);
    },
    updateAuth: function (auth) {
      return $http.put('api/auths/' + auth._id, auth);
    },
    getAuths: function () {
      return $http.get('api/auths');
    }
  };
})

.factory('roleService', function ($http) {
  return {
    getRoles: function (params) {
      return $http.get('api/roles' + '?' + 'offset=' + params.offset + '&' + 'limit=' + params.limit);
    },
    postRole: function (role) {
      return $http.post('api/roles', role);
    },
    deleteRole: function (roleID) {
      return $http.delete('api/roles/' + roleID);
    },
    updateRole: function (role) {
      return $http.put('api/roles/' + role._id, role);
    }
  };
})

.factory('userService', function ($http) {
  return {
    getUsers: function (params) {
      return $http.get('api/users' + '?' + 'offset=' + params.offset + '&' + 'limit=' + params.limit+ '&' + 'name=' + params.name);
    },
    postUser: function (user) {
      return $http.post('api/users', user);
    },
    deleteUser: function (userID) {
      return $http.delete('api/users/' + userID);
    },
    updateUser: function (user) {
      console.log('update:');
      console.log(user);
      return $http.put('api/users/' + user._id, user);
    }
  };
})
