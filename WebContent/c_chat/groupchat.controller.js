(function () {
    'use strict';
    angular.module('mainApp').controller('GroupChatCtrl', function ($scope, GroupChatSvc) {
        $scope.messages = [];
        $scope.Message = '';
        $scope.MAX_LEN = 200;
        
        $scope.sendMessage = function () {
            GroupChatSvc.send($scope.Message);
            $scope.Message = '';
        };
        
        GroupChatSvc.receive().then(null, null, function (Message) {
            $scope.messages.push(Message);
        });
    });
})();
