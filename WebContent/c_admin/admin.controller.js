(function () {
    'use strict';
    console.log('Inside admin.controller.js');
    angular.module('mainApp').controller('AdminCtrl', function ($rootScope, $location, $log, UserSvc, BlogSvc, JobSvc, EventSvc) {
        var vm = this;
        vm.blogs = [];
        vm.events = [];
        vm.jobs = [];
        vm.users = [];

        vm.getNewBlogs = function () {
            console.log('Inside AdminCtrl::getNewBlogs())');
            BlogSvc.getNewBlogs().then(
                    function (data) {
                        vm.blogs = data;
                    }, errorCallback);
        };

        vm.approveBlog = function (blogId) {
            console.log('Inside AdminCtrl::approveBlog())');
            BlogSvc.approve(blogId).then(vm.getNewBlogs, errorCallback);
        };

        vm.rejectBlog = function (blogId) {
            console.log('Inside AdminCtrl::rejectBlog())');
            BlogSvc.reject(blogId).then(vm.getNewBlogs, errorCallback);
        };

        vm.getAllEvents = function () {
            console.log('Inside AdminCtrl::getAllEvents())');
            EventSvc.getAllEvents().then(
                    function (data) {
                        vm.events = data;
                    }, errorCallback);
        };

        vm.createEvent = function (Event) {
            console.log('Inside AdminCtrl::createEvent())');
            EventSvc.create(Event).then(vm.getAllEvents, errorCallback);
        };

        vm.updateEvent = function (Event) {
            console.log('Inside AdminCtrl::updateEvent())');
            EventSvc.update(Event).then(vm.getAllEvents, errorCallback);
        };

        vm.editEvent = function (eventId) {
            console.log('Inside AdminCtrl::editEvent())');
            for (var i = 0; i < vm.events.length; i++) {
				if (vm.events[i].eventId === eventId) {
					vm.Event = angular.copy(vm.events[i]);
                    break;
				}
			}
        };

        vm.getAllJobs = function () {
            console.log('Inside AdminCtrl::getAllJobs())');
            JobSvc.getAllJobs().then(
                    function (data) {
                        vm.jobs = data;
                    }, errorCallback);
        };

        vm.postJob = function (Job) {
            console.log('Inside AdminCtrl::postJob())');
            JobSvc.create(Job).then(vm.getAllJobs, errorCallback);
        };

        vm.updateJob = function (Job) {
            console.log('Inside AdminCtrl::updateJob())');
            JobSvc.update(Job).then(vm.getAllJobs, errorCallback);
        };

        vm.editJob = function (jobId) {
            console.log('Inside AdminCtrl::editJob())');
            for (var i = 0; i < vm.jobs.length; i++) {
				if (vm.jobs[i].jobId === jobId) {
					vm.Job = angular.copy(vm.jobs[i]);
                    break;
				}
			}
        };

        vm.getAllUsers = function () {
            console.log('Inside AdminCtrl::getAllUsers())');
            UserSvc.getAllUsersExceptLoggedIn().then(
                    function (data) {
                        vm.users = data;
                    }, errorCallback);
        };

        vm.enableUser = function (userId) {
            console.log('Inside AdminCtrl::enableUser())');
            UserSvc.enable(userId).then(vm.getAllUsers, errorCallback);
        };

        vm.disableUser = function (userId) {
            console.log('Inside AdminCtrl::disableUser())');
            UserSvc.disable(userId).then(vm.getAllUsers, errorCallback);
        };

        vm.makeAdmin = function (userId) {
            console.log('Inside AdminCtrl::makeAdmin())');
            UserSvc.makeAdmin(userId).then(vm.getAllUsers, errorCallback);
        };

        (function () {
            console.log('Inside AdminCtrl::initaialize())');
            vm.getNewBlogs();
            vm.getAllEvents();
            vm.getAllJobs();
            vm.getAllUsers();
        })();

        function errorCallback(reason) {
            $log.info(reason);
        }
    });
})();
