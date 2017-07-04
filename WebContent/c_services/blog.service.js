(function () {
    'use strict';
    console.log('Inside blog.service.js');
    angular.module('main-app').factory('BlogSvc', function ($http, $q, $rootScope, $log) {
        var BASE_URL = 'http://localhost:10080/collaboration-restbackend/blog';
        return {
            getNewBlogs: function () {
                console.log('Inside getNewBlogs()....');
                return $http.get(BASE_URL + '/new/')
                        .then(successCallback, errorCallback);
            },
            getApprovedBlogs: function () {
                console.log('Inside getApprovedBlogs()....)');
                return $http.get(BASE_URL + '/approved/')
                        .then(successCallback, errorCallback);
            },
            getBlogById: function (blogId) {
                console.log('Inside getBlogById().....)');
                return $http.get(BASE_URL + '/' + blogId)
                        .then(function (response) {
                            $log.info(response);
                            $rootScope.SelectedBlog = response.data;
                            /*$http.get(BASE_URL + '/comment/' + blogId)
                                    .then(function (response) {
                                        $log.info(response);
                                        $rootScope.BlogComments = response.data;
                                    }, errorCallback);*/
                        }, errorCallback);
            },
            create: function (Blog) {
                console.log('Inside create()....');
                return $http.post(BASE_URL + '/', Blog)
                        .then(function (response) {
                            $log.info(response);
                            return {success: true};
                        }, errorCallback);
            },
            update: function (Blog) {
                console.log('Inside update()....');
                return $http.put(BASE_URL + '/' + Blog.blogId, Blog)
                        .then(successCallback, errorCallback);
            },
            remove: function (blogId) {
                console.log('Inside remove()....');
                return $http.delete(BASE_URL + '/' + blogId)
                        .then(function (response) {
                            $log.info(response);
                            return {success: true};
                        }, errorCallback);
            },
            approve: function (blogId) {
                console.log('Inside approve()....');
                return $http.put(BASE_URL + '/approve/' + blogId)
                        .then(successCallback, errorCallback);
            },
            reject: function (blogId) {
                console.log('Inside reject()....');
                return $http.put(BASE_URL + '/reject/' + blogId)
                        .then(successCallback, errorCallback);
            },
            /*comment: function (Comment) {
                console.log('Inside comment()....');
                return $http.post(BASE_URL + '/comment/' + Comment.Blog.blogId, Comment)
                        .then(successCallback, errorCallback);
            },
            getComments: function (blogId) {
                console.log('Inside getComments()....');
                return $http.get(BASE_URL + '/comment/' + blogId)
                        .then(
                                function (response) {
                                    $log.info(response);
                                    $rootScope.BlogComments = response.data;
                                    return response.data;
                                }, errorCallback);
            }*/
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
