(function () {
    'use strict';
    console.log('Inside blog.controller.js');
    angular.module('main-app').controller('BlogCtrl', function ($rootScope, $scope, $location, $log, BlogSvc) {
        var vm = this;
        vm.Blog = null;
        vm.Comment = null;
        vm.blogs = [];
        vm.comments = [];
        vm.getApprovedBlogs = function () {
            console.log('Inside BlogCtrl::getApprovedBlogs()');
            BlogSvc.getApprovedBlogs().then(function (data) {
                vm.blogs = data;
            }, errorCallback);
        };
        vm.getBlog = function (blogId) {
            console.log('Inside BlogCtrl::getBlog()');
            BlogSvc.getBlogById(blogId).then(function (data) {
            	$log.info('Redirecting To #!/blogDetails....');
                $location.path('/blogDetails');
            }, errorCallback);
        };
        vm.getComments = function (blogId) {
            console.log('Inside BlogCtrl::getComments()');
            BlogSvc.getComments(blogId).then(function (data) {
                vm.comments = data;
            }, errorCallback);
        };
        vm.createBlog = function (Blog) {
            console.log('Inside BlogCtrl::createBlog()');
            BlogSvc.create(Blog).then(function (response) {
                $log.info(response);
                vm.getApprovedBlogs();
                $location.path('/blogs');
            }, errorCallback);
        };
        vm.updateBlog = function (Blog) {
            console.log('Inside BlogCtrl::updateBlog()');
            BlogSvc.update(Blog).then(vm.getApprovedBlogs, errorCallback);
        };
        vm.deleteBlog = function (blogId) {
            console.log('Inside BlogCtrl::deleteBlog()');
            BlogSvc.remove(blogId).then(vm.getApprovedBlogs, errorCallback);
        };
        vm.makeComment = function (Blog) {
            console.log('Inside BlogCtrl::makeComment()');
            vm.Comment.Blog = Blog;
            BlogSvc.comment(vm.Comment).then(function (response) {
                $log.info(response);
                $location.path('/blogs');
            }, errorCallback);
        };
        vm.editBlog = function (blogId) {
            $location.path('/editBlog');
        };

        vm.submit = function () {
            console.log('Inside BlogCtrl::submit()');
            vm.Blog.User = $rootScope.loggedInUser;
            vm.createBlog(vm.Blog);
            vm.reset();
        };
        vm.reset = function () {
            console.log('Inside BlogCtrl::reset()');
            vm.Blog = {};
            $scope.blogForm.$setPristine();
        };

        (function () {
            console.log('Inside BlogCtrl::getApprovedBlogs()');
            vm.getApprovedBlogs();
        })();

        function errorCallback(reason) {
            $log.info(reason);
        }
    });
})();

