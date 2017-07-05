(function () {
    'use strict';
    console.log('Inside user.service.js');
    angular.module('main-app').factory('UserSvc', function ($http, $q, $log) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/user';
        return {
            getAllUsers: function () {
                return $http.get(BASE_URL + '/all/').then(
                    successCallback, errorCallback
                );
            },
            getAllUsersExceptLoggedIn: function () {
                return $http.get(BASE_URL + '/others/').then(
                    successCallback, errorCallback
                );
            },
            getUserById: function (userId) {
                return $http.get(BASE_URL + '/userId/', userId).then(
                    successCallback, errorCallback
                );
            },
            getUserByUsername: function (username) {
                return $http.get(BASE_URL + '/username/', username).then(
                    successCallback, errorCallback
                );
            },
            register: function (User) {
                return $http.post(BASE_URL + '/', User).then(
                    registerSuccessCallback, errorCallback
                );
            },
            update: function (User) {
                return $http.put(BASE_URL + '/' + User.userId, User).then(
                    successCallback, errorCallback
                );
            },
            enable: function (userId) {
                return $http.put(BASE_URL + '/enable/' + userId).then(
                    successCallback, errorCallback
                );
            },
            disable: function (userId) {
                return $http.put(BASE_URL + '/disable/' + userId).then(
                    successCallback, errorCallback
                );
            },
            makeAdmin: function (userId) {
                return $http.put(BASE_URL + '/makeAdmin/' + userId).then(
                    successCallback, errorCallback
                );
            }
        };

        function successCallback(response) {
            return response.data;
        }

        function errorCallback(reason) {
            $log.info(reason);
            return function () {
                return {
                    success: false,
                    message: reason.data
                };
            };
        }

        function registerSuccessCallback(response) {
            $log.info('Inside registerSuccessCallback()....');
            $log.info(response);
            var newResponse = { success: true };
            return newResponse;
        }
    });
})();