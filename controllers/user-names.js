'use strict';

var guests = function(){
	var main = this;
	this.connectedUsers = [];

	var isAvailable = function(id){
		if (main.connectedUsers.includes(String(id))){
			return false;
		} else {
			return true;
		};
	};

	this.addGuest = function(id){
		if (isAvailable(id)){
			main.connectedUsers.push(id);
			return {idSet: true, users: main.connectedUsers};
		} else {
			return {idSet: false};
		}
	};

	this.removeGuest = function(id){
		if (!isAvailable(id)){
			var location = main.connectedUsers.indexOf(id);
			main.connectedUsers.splice(location, 1);
			return main.connectedUsers;
		} else {
			return false;
		};
	};
};

module.exports = new guests();
