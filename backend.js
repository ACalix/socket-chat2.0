'use strict';

var userList = require('./controllers/user-names.js');
var Chatroom = require('./controllers/chatrooms.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('src'));

io.on('connection', function(client) {

	client.on('client_message', function(message) {
		var nickname = client.nickname;
    var chatroom = client.room;
    var message_list = Chatroom.addMessage(
      chatroom, {user: nickname, message: message}
    );
    if (message_list.status) {
  		client.broadcast.emit('chat update',
        {room: chatroom, update: 'message', message: message_list.update});
      client.emit('chat update',
        {room: chatroom, update: 'message', message: message_list.update});
    }
	});

	client.on('join', function(name) {
		client.nickname = name;
		var users = userList.addGuest(name);
    var chatrooms = Chatroom.getChatrooms();
		if (users.idSet) {
			client.emit('client_join', {isValid: users.idSet, chatrooms: chatrooms});
		} else {
			client.emit('client_join', {isValid: users.idSet});
			client.nickname = '';
		};
	});

  client.on('join_chatroom', function(room) {
    var current_room = client.room;
    var username = client.nickname;
    var leave_chatroom = Chatroom.leaveCurrentChatroom(current_room, username);
    client.room = room;
    var join_chatroom = Chatroom.joinChatroom(room, username);
    if(join_chatroom.status) {
      var messages = Chatroom.getMessages(room);
      client.emit('join_room',
        {messages: messages, guests: join_chatroom.guest_list});
      client.broadcast.emit('chat update',
        {room: room, update: 'members', guests: join_chatroom.guest_list});
    }
    if(leave_chatroom) {
      let updated_member_list = Chatroom.getMemberList(current_room);
      client.broadcast.emit('chat update',
        {room: current_room, update: 'members', guests: updated_member_list.list});
    }
  });

	client.on('disconnect', function() {
		var nickname = client.nickname;
    var current_room = client.room;
		var users = userList.removeGuest(nickname);
    Chatroom.leaveCurrentChatroom(current_room, nickname);
    var update_members = Chatroom.getMemberList(current_room);
    if(update_members.status) {
  		client.broadcast.emit('chat update',
        {room: current_room, update: 'members', guests: update_members.list});
    }
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + './build/index.html');
});

http.listen(4000);
