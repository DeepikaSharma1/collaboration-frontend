(function () {
    'use strict';
    angular.module('main-app').controller('JobCtrl', function ($rootScope, $scope, $location, $log, JobSvc) {
        var vm = this;
        vm.Job = null;
        vm.jobs = [];
        vm.jobsApplied = [];

        vm.getJobs = function () {
            console.log('Inside JobCtrl::getJobs()');
            JobSvc.getAllJobs().then(function (data) {
                vm.jobs = data;
            }, errorCallback);
        };
        vm.getJobDetails = function (jobId) {
            console.log('Inside JobCtrl::getJobDetails()');
            JobSvc.getJob(jobId).then(function (data) {
                vm.Job = data;
            }, errorCallback);
        };
        vm.getJobsApplied = function () {
            console.log('Inside JobCtrl::getJobsApplied()');
            JobSvc.getJobsApplied().then(function (data) {
                vm.jobsApplied = data;
            }, errorCallback);
        };
        vm.applyJob = function (jobId) {
            console.log('Inside JobCtrl::applyJob()');
            JobSvc.apply(jobId).then(function (data) {
                vm.Job = data;
                window.alert('You Successfully Applied for Job!');
                vm.getJobsApplied();
            }, errorCallback);
        };
        
        vm.hasApplied = function (jobId) {
			console.log("Inside JobCtrl::hasApplied()");
			var loggedInUserId = $rootScope.loggedInUser.userId;
			$log.info("Logged In User Id: " + loggedInUserId);
			for (var i = 0; i < vm.jobsApplied.length; i++) {
				var jobApplied = vm.jobsApplied[i];
				$log.info(jobApplied);
				if (jobApplied.job.jobId === jobId && jobApplied.user.userId === loggedInUserId) {
					$log.info(jobApplied.status === "JOB_APPLIED");
					return (jobApplied.status === "JOB_APPLIED");
				}
			}
			return false;
		};

        function errorCallback(reason) {
            $log.info(reason);
        }

        (function () {
            vm.getJobs();
            vm.getJobsApplied();
        })();
    });
})();
