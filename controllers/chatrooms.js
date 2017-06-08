'use strict';

const Chatroom = function() {
  const self = this;
  const chatroom_info = {
    'Movies' : {
      'active_guests': [],
      'messages': []
    },
    'Music' : {
      'active_guests': [],
      'messages': []
    },
    'Technology' : {
      'active_guests': [],
      'messages': []
    },
    'News' : {
      'active_guests': [],
      'messages': []
    },
    'Random' : {
      'active_guests': [],
      'messages': []
    }
  }

  const isValidRoom = (room) =>
    (self.getChatrooms().indexOf(room)) >= 0 ? true : false;

  const isAvailable = (room, id) =>
    (chatroom_info[room].active_guests.includes(String(id))) ?
      false : true;

  this.leaveCurrentChatroom = (room, id) => {
    if (isValidRoom(room)) {
      let index = chatroom_info[room].active_guests.indexOf(id);
      if (index > -1) {
        chatroom_info[room].active_guests.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
  }

  this.getChatrooms = () =>
    Object.keys(chatroom_info);

  this.getMessages = (room) =>
    chatroom_info[room].messages;

  this.getMemberList = (room) =>
    (isValidRoom(room)) ?
      {status: true, list: chatroom_info[room].active_guests} : {status: false}

  this.addMessage = function(room , message) {
    if(isValidRoom(room)) {
      if(chatroom_info[room].messages.length >= 10) {
        chatroom_info[room].messages.splice(0, 1);
      }
      chatroom_info[room].messages.push(message);
      return {'status': true, 'update': message};
    } else {
      return {'status': false};
    }
  }

  // addGuest takes in @room @id, registers the id into the chatroom
  this.addGuest = function(room, id) {
		if (isAvailable(room, id)) {
			chatroom_info[room].active_guests.push(id);
		}
		return chatroom_info[room].active_guests;
	}

  this.joinChatroom = function(room, username) {
    // Validate that the room is valid,
    // Return the active_guests for the chatroom and the status
    if(isValidRoom(room)) {
      var guest_list = self.addGuest(room, username);
      return {'status': true, 'guest_list': guest_list};
    } else {
      return {'status': false};
    }
  }
}

module.exports = new Chatroom();
