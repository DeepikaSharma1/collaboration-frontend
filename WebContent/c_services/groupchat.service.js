(function () {
	'use strict';
	angular.module('main-app').service('GroupChatSvc', function ($q, $timeout, $rootScope) {
		console.log('Inside GroupChatSvc()....');
		var User = $rootScope.loggedInUser;
		var service = {};
		var listener = $q.defer();
		var socket = {
			client: null,
			stomp: null
		};
		var msgIds = [];
		service.RECONNECT_TIMEOUT = 30000;
		service.SOCKET_URL = '/collaboration-restbackend/groupChat';
		service.CHAT_TOPIC = '/topic/message';
		service.CHAT_BROKER = '/app/groupChat';

		service.receive = function () {
			console.log('Inside GroupChatSvc::receive()');
			return listener.promise;
		};

		service.send = function (Message) {
			console.log('Inside GroupChatSvc::send()');
			var genId = Math.floor(Math.random() * 1000000);
			socket.stomp.send(service.CHAT_BROKER, {
				priority: 9
			}, JSON.stringify({
				id: genId,
				message: Message,
				username: User.username
			}));
			msgIds.push(genId);
		};

		var reconnect = function () {
			console.log('Inside GroupChatSvc::reconnect()....');
			$timeout(function () {
				initialize();
			}, this.RECONNECT_TIMEOUT);
		};

		var getMessage = function (data) {
			console.log('Inside GroupChatSvc::getMessage()....');
			var Message = JSON.parse(data);
			var outMsg = {};

			outMsg.message = Message.message;
			outMsg.username = Message.username;
			outMsg.time = new Date(Message.time);

			return outMsg;
		};

		var startListener = function () {
			console.log('Inside GroupChatSvc::startListener()....');
			socket.stomp.subscribe(service.CHAT_TOPIC, function (data) {
				listener.notify(getMessage(data.body));
			});
		};

		var initialize = function () {
			console.log('Inside GroupChatSvc::initialize()....');
			socket.client = new SockJS(service.SOCKET_URL);
			socket.stomp = Stomp.over(socket.client);
			socket.stomp.connect({}, startListener);
			socket.stomp.onclose = reconnect;
		};

		initialize();

		return service;
	});
})();
