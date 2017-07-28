(function () {
    'use strict';
    console.log('Inside script.js');
    angular.module('main-app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        console.log('Inside config()....');
        $routeProvider
            .when('/home', {
                templateUrl: 'c_home/home.view.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
            })
            .when('/login', {
                templateUrl: 'c_user/login.view.html',
                controller: 'UserCtrl',
                controllerAs: 'vm',
            })
            .when('/register', {
                templateUrl: 'c_user/register.view.html',
                controller: 'UserCtrl',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'c_user/profile.view.html',
                /*controller: 'UserCtrl',
                controllerAs: 'vm'*/
            })
            .when('/blogs', {
                templateUrl: 'c_blog/blogs.view.html',
                controller: 'BlogCtrl',
                controllerAs: 'vm'
            })
            .when('/createBlog', {
                templateUrl: 'c_blog/create-blog.view.html',
                controller: 'BlogCtrl',
                controllerAs: 'vm'
            })
            .when('/blogDetails', {
                templateUrl: 'c_blog/blog-details.view.html',
                controller: 'BlogCtrl',
                controllerAs: 'vm'
            })
            .when('/events', {
                templateUrl: 'c_event/events.view.html',
                controller: 'EventCtrl',
                controllerAs: 'vm'
            })
            .when('/eventDetails', {
                templateUrl: 'c_event/event-details.view.html',
                controller: 'EventCtrl',
                controllerAs: 'vm'
            })
            .when('/jobs', {
                templateUrl: 'c_job/jobs.view.html',
                controller: 'JobCtrl',
                controllerAs: 'vm'
            })
            .when('/jobDetails', {
                templateUrl: 'c_job/job-details.view.html',
                controller: 'JobCtrl',
                controllerAs: 'vm'
            })
            .when('/friends', {
                templateUrl: 'c_friend/friends.view.html',
                controller: 'FriendCtrl',
                controllerAs: 'vm'
            })
            .when('/friendRequests', {
                templateUrl: 'c_friend/friend-requests.view.html',
                controller: 'FriendCtrl',
                controllerAs: 'vm'
            })
            .when('/findFriends', {
                templateUrl: 'c_friend/find-friends.view.html',
                controller: 'FriendCtrl',
                controllerAs: 'vm'
            })
            .when('/manageBlogs', {
                templateUrl: 'c_admin/manage-blogs.view.html',
                controller: 'AdminCtrl',
                controllerAs: 'vm'
            })
            .when('/manageEvents', {
                templateUrl: 'c_admin/manage-events.view.html',
                controller: 'AdminCtrl',
                controllerAs: 'vm'
            })
            .when('/manageJobs', {
                templateUrl: 'c_admin/manage-jobs.view.html',
                controller: 'AdminCtrl',
                controllerAs: 'vm'
            })
            .when('/manageUsers', {
                templateUrl: 'c_admin/manage-users.view.html',
                controller: 'AdminCtrl',
                controllerAs: 'vm'
            })
            .when('/privateChat', {
                templateUrl: 'c_friend/private-chat.view.html',
                controller: 'PrivateChatCtrl',
                controllerAs: 'vm'
            })
            .when('/groupChat', {
                templateUrl: 'c_chat/group-chat.view.html',
                controller: 'GroupChatCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$log'];
    function run($rootScope, $location, $cookies, $http, $log) {
        $log.info('Inside run()....');
        $rootScope.loggedInUser = $cookies.getObject('loggedInUser') || {};
        $rootScope.signedIn = $rootScope.loggedInUser.username !== undefined;
        $log.info('User Signed In? ' + $rootScope.signedIn);			// prints false initially
        if ($rootScope.loggedInUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.loggedInUser;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            $log.info('Inside $on(locationChangeStart) Event Handler....');
            
            var restrictedPage = $.inArray($location.path(), [
                '/home', '/login', '/register',
                '/blogs', '/createBlog', '/blogDetails',
                '/events', '/eventDetails',
                '/jobs', '/jobDetails',
                '/friends', '/friendRequests', '/findFriends',
                '/privateChat', '/groupChat'
            ]) === -1;
            var loggedIn = $rootScope.loggedInUser.username;
            $log.info('username Logged In:' + loggedIn);
            if (!loggedIn) {
                if (restrictedPage) {
                    $location.path('/login');
                }
            } else {
                var role = $rootScope.loggedInUser.role;
                var adminPage = $.inArray($location.path(), [
                    '/manageBlogs', '/manageEvents', '/manageJobs', '/manageUsers'
                ]) === 0;
                if (adminPage && role !== 'ADMIN') {
                    alert('You Are Not Authorized To View This Page!');
                    $location.path('/home');
                }
            }
        });
        
    }
})();

