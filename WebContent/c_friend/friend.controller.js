(function () {
    'use strict';
    console.log('Inside friend.controller.js');
    angular.module('main-app').controller('FriendCtrl', function ($rootScope, $scope, $location, $log, FriendSvc, UserSvc, MsgSvc) {
        var vm = this;
        vm.Friend = null;
        vm.User = null;
        vm.friends = [];
        vm.users = [];
        vm.friendRequests = [];
        vm.getAllUsers = function () {
            console.log('Inside FriendCtrl::getAllUsers()');
            UserSvc.getAllUsersExceptLoggedIn().then(function (data) {
                $log.info(data);
                vm.users = data;
            }, errorCallback);
        };
        vm.getFriends = function () {
            console.log('Inside FriendCtrl::getFriends()');
            FriendSvc.getFriends().then(function (data) {
                $log.info(data);
                vm.friends = data;
            }, errorCallback);
        };
        vm.getFriendRequests = function () {
            console.log('Inside FriendCtrl::getFriendRequests()');
            FriendSvc.getFriendRequests().then(function (data) {
                $log.info(data);
                vm.friendRequests = data;
            }, errorCallback);
        };
        vm.sendFriendRequest = function (friendId) {
            console.log('Inside FriendCtrl::sendFriendRequest()');
            FriendSvc.sendFriendRequest(friendId).then(function (data) {
                $log.info(data);
                vm.Friend = data;
                MsgSvc.success('Friend Request Sent Successfully!');
            }, errorCallback);
        };
        vm.acceptFriendRequest = function (friendId) {
            console.log('Inside FriendCtrl::acceptFriendRequest()');
            FriendSvc.acceptFriendRequest(friendId).then(function (data) {
                $log.info(data);
                vm.getFriendRequests();
            }, errorCallback);
        };
        vm.rejectFriendRequest = function (friendId) {
            console.log('Inside FriendCtrl::rejectFriendRequest()');
            FriendSvc.rejectFriendRequest(friendId).then(function (data) {
                $log.info(data);
                vm.getFriendRequests();
            }, errorCallback);
        };
        vm.chat = function (friendName) {
            console.log('Inside FriendCtrl::chat()');
            $rootScope.friendName = friendName;
            $location.path('/privateChat');
        };
        
        vm.isFriend = function(friendId) {
			console.log('Inside FriendCtrl::isFriend()....');
			for (var i = 0; i < vm.friends.length; i++) {
				console.log('Checking ' + vm.friends[i] + ' ...');
				if (vm.friends[i].user.userId === friendId) {
					console.log('vm.friends[i].user.userId === friendId: ' + (vm.friends[i].user.userId === friendId));
					return true;
				}
			}
			return false;
		};
        
        vm.hasRequestSent = function(toUserId) {
			console.log('Inside FriendCtrl::hasRequestSent()....');
			for (var i = 0; i < vm.friendRequests.length; i++) {
				if (vm.friendRequests[i].user.userId === toUserId) {
					$log.info('vm.friendRequests[i].user.userId === toUserId: ' + (vm.friendRequests[i].user.userId === toUserId));
					return true;
				}
			}
			return false;
		};

        function errorCallback(reason) {
            $log.info(reason.data);
            MsgSvc.failure(reason.data, false);
        }

        (function () {
            vm.getAllUsers();
            vm.getFriends();
            vm.getFriendRequests();
        })();
    });
})();

