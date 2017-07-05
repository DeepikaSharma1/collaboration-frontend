(function () {
    'use strict';
    console.log('Inside job.services.js');
    angular.module('main-app').factory('JobSvc', function ($http, $q, $rootScope, $log) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/job';
        return {
            getAllJobs: function () {
                console.log('Inside getAllJobs()....)');
                return $http.get(BASE_URL + '/')
                    .then(successCallback, errorCallback);
            },
            getJob: function (jobId) {
                console.log('Inside getJob()....)');
                return $http.get(BASE_URL + '/' + jobId)
                    .then(function (response) {
                        $log.info(response);
                        $rootScope.SelectedJob = response.data;
                    }, errorCallback);
            },
            create: function (Job) {
                console.log('Inside create()....)');
                return $http.post(BASE_URL + '/', Job)
                    .then(getAllJobs(), errorCallback);
            },
            update: function (Job) {
                console.log('Inside update()....)');
                return $http.put(BASE_URL + '/' + Job.jobId, Job)
                    .then(getAllJobs(), errorCallback);
            },
            apply: function (jobId) {
                console.log('Inside apply()....)');
                return $http.post(BASE_URL + '/apply/' + jobId)
                    .then(successCallback, errorCallback);
            },
            getJobsApplied: function () {
                console.log('Inside getJobsApplied()....)');
                return $http.get(BASE_URL + '/applied/')
                    .then(successCallback, errorCallback);
            }
        };

        function successCallback(response) {
            $log.info(response);
            return response.data;
        }

        function errorCallback(reason) {
            $log.info(reason);
            return $q.reject(reason);
        }
    });
})();
