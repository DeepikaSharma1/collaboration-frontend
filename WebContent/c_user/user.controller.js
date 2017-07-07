(function () {
    'use strict';
    console.log('Inside user.controller.js');
    angular.module('main-app').controller('UserCtrl', function ($rootScope, $location, $window, $log, UserSvc, AuthSvc, MsgSvc) {
        var vm = this;
        vm.User = null;
        vm.users = [];
        vm.login = function () {
            console.log('Inside UserCtrl::login()');
            vm.dataLoading = true;
            AuthSvc.login(vm.User.username, vm.User.password, function (response) {
                $log.info(response);
                if (response.success) {
                    AuthSvc.setCredentials(response.data);
                    $log.info('Redirecting To Home....')
                    $location.path('/');
                    $window.location.reload();
                } else {
                    MsgSvc.failure('Error Logging In! Please Contact Admin');
                    vm.dataLoading = false;
                }
            });
        };
        vm.register = function () {
            console.log('Inside UserCtrl::register()');
            vm.dataLoading = true;
            UserSvc.register(vm.User).then(function (response) {
                if (response.success) {
                    $log.info('Registration Successful');
                    MsgSvc.success('Registration Successful!', true);
                    $location.path('/login');
                }
            }, function (reason) {
                $log.info(reason.message);
                MsgSvc.failure(reason.message);
                vm.dataLoading = false;
            });
        };

        (function () {
            AuthSvc.clearCredentials();
        })();
    });
})();

