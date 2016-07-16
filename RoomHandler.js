var CRoom = require('CRoom');

var RoomHandler = {};
var rooms = {}

RoomHandler.addRoom = function (room) {
	rooms[room.name] = new CRoom(room);
}

RoomHandler.getRooms = function () {
	return rooms;
}

RoomHandler.getRoom = function (name) {
	if (rooms.hasOwnProperty(name)) {
		return rooms[name];
	}
}

RoomHandler.run = function () {
	for(var i in rooms) {
		rooms[i].run();
	}
}

module.exports = RoomHandler;