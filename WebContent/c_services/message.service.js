(function () {
    'use strict';
    console.log('Inside message.service.js');
    angular.module('main-app').factory('MsgSvc', function ($rootScope) {
        (function () {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessages();
            });
        })();
        
        function clearFlashMessages() {
            var FlashMsg = $rootScope.FlashMsg;
            if (FlashMsg) {
                if (!FlashMsg.keepAfterLocationChange) {
                    delete($rootScope.FlashMsg);
                } else {
                    FlashMsg.keepAfterLocationChange = false;
                }
            }
        }
        
        return {
            success: function (message, keepAfterLocationChange) {
                $rootScope.FlashMsg = {
                    message: message,
                    type: 'success',
                    keepAfterLocationChange: keepAfterLocationChange
                };
            },
            failure: function (message, keepAfterLocationChange) {
                $rootScope.FlashMsg = {
                    message: message,
                    type: 'failure',
                    keepAfterLocationChange: keepAfterLocationChange
                };
            }
        };
    });
})();

