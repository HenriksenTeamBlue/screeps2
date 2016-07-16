function ResourceManager(room) {
	this.room = room;
}

ResourceManager.prototype.getClosestResource = function(creep, free) {
	// Find all unworked sources
	var sources = false;

	if (free)  {
		sources = this.getFreeSources(creep.room);
	}

	// If there are none look at worked sources too
	if (!sources) {
		sources = this.getSources(creep.room);
	}

	// Pick closest source first
	_.sortBy(sources, (src) => creep.pos.getRangeTo(src));

	return sources[0];
};
ResourceManager.prototype.getResourceById = function(id) {
	return Game.getObjectById(id);
};
ResourceManager.prototype.getSources = function(room) {
	return this.room.find(FIND_SOURCES, {
		filter: (src) =>
			src.pos.findInRange(FIND_HOSTILE_CREEPS, 3).length == 0
	});
};

ResourceManager.prototype.getFreeSources = function(room) {
	
	var sources = this.getSources(room);
	var creeps = room.find(FIND_MY_CREEPS, { filter: (creep) => creep.memory.source });
	var ret = [];
	
	for(var i in sources) {
	    var free = true;
	    
	    for (var n in creeps) {
	        if (sources[i].id == creeps[n].memory.source) {
	            free = false;
	            break;
	        }
	    }
	    
	    if (free) {
	        ret.push(sources[i]);
	    }
	}
	
	return ret;
};

module.exports = ResourceManager;