(function () {
	'use strict';
	console.log('Inside auth.service.js');
	angular
		.module('main-app')
		.factory(
		'AuthSvc',
		function ($http, $cookies, $rootScope, $timeout, $log) {
			var BASE_URL = 'http://localhost:10080/collaboration-restbackend/user';
			var service = {
				login: login,
				logout: logout,
				setCredentials: setCredentials,
				clearCredentials: clearCredentials
			};
			return service;

			function login(username, password, callback) {
				console.log('Inside login()....');
				$http.post(BASE_URL + '/login/', {
					username: username,
					password: password
				}).then(function (response) {
					var result = {
						data: response.data,
						success: true
					};
					callback(result);
				}, errorCallback);
			}

			function logout() {
				console.log('Inside logout()....');
				return $http.put(BASE_URL + '/logout/').then(
					logoutSuccessCallback, errorCallback);
			}

			function setCredentials(User) {
				console.log('Inside setCredentials()....');
				$rootScope.loggedInUser = User;
				$http.defaults.headers.common['Authorization'] = 'Basic '
					+ $rootScope.loggedInUser;
				// Save cookies
				var cookieExpireDate = new Date();
				cookieExpireDate
					.setDate(cookieExpireDate.getDate() + 3);
				$cookies.putObject('loggedInUser',
					$rootScope.loggedInUser, {
						expire: cookieExpireDate
					});
			}

			function clearCredentials() {
				console.log('Inside clearCredentials()....)');
				$rootScope.globals = {};
				$rootScope.loggedInUser = {};
				$cookies.remove('loggedInUser');
				$http.defaults.headers.common.Authorization = 'Basic';
			}

			function logoutSuccessCallback(response) {
				$log.info(response);
				var result = {
					success: true
				};
				return result;
			}

			function errorCallback(reason) {
				$log.info(reason);
				alert(reason.data);
			}

		});
})();
