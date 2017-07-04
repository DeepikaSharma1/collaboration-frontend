(function () {
    'use strict';
    console.log('Inside friend.service.js');
    angular.module('main-app').factory('FriendSvc', function ($http, $q, $log) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/friend';
        var service = {
        		sendFriendRequest: sendFriendRequest,
        		getFriends: getFriends,
        		getFriendRequests: getFriendRequests,
        		acceptFriendRequest: acceptFriendRequest,
        		rejectFriendRequest: rejectFriendRequest
        };
        return {
            sendFriendRequest: function (friendId) {
                console.log('Inside sendFriendRequest()....)');
                return $http.get(BASE_URL + '/send/' + friendId)
                        .then(successCallback, errorCallback);
            },
            getFriends: function () {
                console.log('Inside getFriends()....)');
                return $http.get(BASE_URL + '/friends/')
                        .then(successCallback, errorCallback);
            },
            getFriendRequests: function getFriendRequests() {
                console.log('Inside getFriendRequests()....)');
                return $http.get(BASE_URL + '/requests/')
                        .then(successCallback, errorCallback);
            },
            acceptFriendRequest: function acceptFriendRequest(friendId) {
                console.log('Inside acceptFriendRequest()....)');
                return $http.get(BASE_URL + '/accept/' + friendId)
                        .then(successCallback, errorCallback);
            },
            rejectFriendRequest: function rejectFriendRequest(friendId) {
                console.log('Inside rejectFriendRequest()....)');
                return $http.get(BASE_URL + '/reject/' + friendId)
                        .then(successCallback, errorCallback);
            }
        };
        
        function successCallback(response) {
            $log.info(response);
            return response.data;
        }
        
        function errorCallback(reason) {
            $log.info(reason);
            return $q.reject(reason);
        }
    });
})();

