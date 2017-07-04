(function () {
    'use strict';
    angular.module('mainApp').controller('PrivateChatCtrl', function ($scope, PrivateChatSvc) {
        $scope.messages = [];
        $scope.message = '';
        $scope.MAX_LEN = 200;

        $scope.sendMessage = function () {
            PrivateChatSvc.send($scope.message);
            $scope.message = '';
        };

        PrivateChatSvc.receive().then(null, null, function (Message) {
            $scope.messages.push(Message);
        });
    });
})();
