(function () {
    'use strict';
    angular.module('main-app').service('PrivateChatSvc', function ($q, $timeout, $rootScope) {
        console.log('Inside PrivateChatSvc()');
        var User = $rootScope.loggedInUser;
		var friendName = $rootScope.friendName;
		var service = {};
		var listener = $q.defer();
		var socket = {
			client: null,
			stomp: null
		};
		var msgIds = [];
		service.RECONNECT_TIMEOUT = 30000;
		service.SOCKET_URL = '/collaboration-restbackend/privateChat';
		service.CHAT_TOPIC = '/queue/message/' + User.username;
		service.CHAT_BROKER = '/app/privateChat';

		service.receive = function() {
			console.log('Inside PrivateChatSvc::receive()');
			return listener.promise;
		};

		service.send = function(Message) {
			console.log('Inside PrivateChatSvc::send()');
			var genId = Math.floor(Math.random() * 1000000);
			socket.stomp.send(service.CHAT_BROKER, {
				priority : 9
			}, JSON.stringify({
				id : genId,
				message : Message,
				username : User.username,
				friendName: friendName
			}));
			msgIds.push(genId);
		};

		var reconnect = function() {
			console.log('Inside PrivateChatSvc::reconnect()....');
			$timeout(function() {
				initialize();
			}, this.RECONNECT_TIMEOUT);
		};

		var getMessage = function(data) {
			console.log('Inside PrivateChatSvc::getMessage()....');
			var Message = JSON.parse(data);
			var outMsg = {};

			outMsg.message = Message.message;
			outMsg.username = Message.username;
			outMsg.time = new Date(Message.time);

			return outMsg;
		};

		var startListener = function() {
			console.log('Inside PrivateChatSvc::startListener()....');
			socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
				listener.notify(getMessage(data.body));
			});
		};

		var initialize = function() {
			console.log('Inside PrivateChatSvc::initialize()....');
			socket.client = new SockJS(service.SOCKET_URL);
			socket.stomp = Stomp.over(socket.client);
			socket.stomp.connect({}, startListener);
			socket.stomp.onclose = reconnect;
		};

		initialize();

		return service;
    });
})();