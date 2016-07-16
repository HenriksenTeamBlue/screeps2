var RoomHandler = require('RoomHandler');

// Init rooms
for (var i in Game.rooms) {
	RoomHandler.addRoom(Game.rooms[i]);
};

RoomHandler.run();