(function () {
    'use strict';
    console.log('Inside event.controller.js');
    angular.module('mainApp').controller('EventCtrl', function ($location, $log, EventSvc) {
        var vm = this;
        vm.events = [];
        vm.getAllEvents = function () {
            console.log('Inside EventCtrl::getAllEvents()');
            EventSvc.getAllEvents().then(function (data) {
                vm.events = data;
            }, errorCallback);
        };
        vm.getEvent = function (eventId) {
            console.log('Inside EventCtrl::getEvent()');
            EventSvc.getEventById(eventId).then(function (data) {
                $log.info(data);
                $location.path('/eventDetails');
            }, errorCallback);
        };
        
        (function () {
            vm.getAllEvents();
        })();
        
        function errorCallback(reason) {
            $log.info(reason);
        }
    });
})();
