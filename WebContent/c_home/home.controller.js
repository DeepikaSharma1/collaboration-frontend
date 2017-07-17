(function () {
    'use strict';
    console.log('Inside home.controller.js');
    angular.module('main-app').controller('HomeCtrl', function ($rootScope, $location, $log, UserSvc, AuthSvc) {
        var vm = this;
        vm.User = null;
        vm.users = [];
        vm.logout = function () {
            console.log('Inside HomeCtrl::logout()');
            AuthSvc.logout().then(function (response) {
                if (response.success) {
                    window.alert('You Logged Out Successfully!');
                    $location.path('/login');
                }
            }, function (reason) {
                window.alert('Error Logging Out, Please Contact Admin!');
                AuthSvc.clearCredentials();
                $location.path('/login');
            });
        };

        (function () {
            loadLoggedInUser();
            loadRegisteredUsers();
        })();

        function loadLoggedInUser() {
            console.log('Inside HomeCtrl::loadLoggedInUser()');
            $log.info($rootScope.loggedInUser);
            vm.User = $rootScope.loggedInUser;
        }

        function loadRegisteredUsers() {
        	console.log("Inside HomeCtrl::loadRegisteredUsers()");
            UserSvc.getAllUsersExceptLoggedIn().then(function (data) {
                $log.info(data);
                vm.users = data;
            }, function (reason) {
                $log.info(reason);
            });
        }
    });
})();
