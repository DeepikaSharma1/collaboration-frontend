(function () {
    'use strict';
    angular.module('main-app').controller('PrivateChatCtrl', function ($scope, PrivateChatSvc) {
        $scope.messages = [];
        $scope.Message = '';
        $scope.MAX_LEN = 200;

        $scope.sendMessage = function () {
            PrivateChatSvc.send($scope.Message);
            $scope.Message = '';
        };

        PrivateChatSvc.receive().then(null, null, function (Message) {
            $scope.messages.push(Message);
        });
    });
})();
