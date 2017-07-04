(function() {
	'use strict';
	console.log('Inside event.service.js');
	angular
			.module('main-app')
			.factory(
					'EventSvc',
					function($http, $q, $rootScope, $log) {
						var BASE_URL = 'http://localhost:10080/collaboration-restbackend/event';
						var service = {
							getAllEvents : getAllEvents,
							getEventById : getEventById,
							create : create,
							update : update
						};
						return service;
						
						function getAllEvents() {
							console.log('Inside getAllEvents()....');
							return $http.get(BASE_URL + '/').then(
									function(response) {
										$log.info(response);
										return response.data;
									}, errorCallback);
						}
						
						function getEventById(eventId) {
							console.log('Inside getEventById()....');
							return $http
									.get(BASE_URL + '/' + eventId)
									.then(
											function(response) {
												$log.info(response);
												$rootScope.SelectedEvent = response.data;
											}, errorCallback);
						}
						
						function create(Event) {
							console.log('Inside create()....');
							return $http.post(BASE_URL + '/', Event).then(
									getAllEvents, errorCallback);
						}
						
						function update(Event) {
							console.log('Inside update()....');
							return $http.put(BASE_URL + '/' + Event.eventId,
									Event).then(getAllEvents, errorCallback);
						}

						function errorCallback(reason) {
							$log.info(reason);
							return $q.reject(reason);
						}
					});
})();
