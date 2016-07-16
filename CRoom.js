var PopulationManager = require('PopulationManager');
var CreepFactory = require('CreepFactory');
var PopulationManager = require('PopulationManager');
var depositManager = require('DepositManager');
var resourceManager = require('ResourceManager');

function CRoom(room, roomHandler) {

	this.room = room;
	this.creeps = [];
	this.roomHandler = roomHandler;
	this.depositManager = new depositManager(this.room);
	this.resourceManager = new resourceManager(this.room);
	this.populationManager = new PopulationManager(this.room);
	this.populationManager = new PopulationManager(this.room);
	this.creepFactory = new CreepFactory(this.depositManager, this.resourceManager, this.populationManager);
	
	// One miner per resource
	this.populationManager.typeDistribution.CreepMiner.max = this.resourceManager.getSources().length;
	// Two carriers per miner (first spawn choice when an unmanned miner exists)
	this.populationManager.typeDistribution.CreepCarrier.max = this.populationManager.typeDistribution.CreepMiner.total * 2;
	// One starter per resource (kill off when a resource has miner and 2 carriers)
	this.populationManager.typeDistribution.CreepStarter.max = this.resourceManager.getSources().length - Math.ceil(this.populationManager.typeDistribution.CreepCarrier.total / 2);
	
	//console.log(this.populationManager.typeDistribution.CreepStarter.max);

	this.loadCreeps();
	this.populate();
}

CRoom.prototype.loadCreeps = function() {
	var creeps = this.room.find(FIND_MY_CREEPS);

	for (var i in creeps) {
		var c = this.creepFactory.load(creeps[i]);
		this.creeps.push(c);
	}
};

CRoom.prototype.populate = function() {

	var spawns = _.filter(this.depositManager.spawns, (spawn) => !spawn.spawning);

	for (var i in spawns) {

		if ((this.depositManager.energy() / this.depositManager.energyCapacity()) > 0.2) {
			var types = this.populationManager.getTypes();

			for (var i = 0; i < types.length; i++) {
			
				var ctype = this.populationManager.getType(types[i]);
				
				if (this.depositManager.deposits.length >= ctype.minExtensions) {

					if (ctype.total < ctype.max) {
						this.creepFactory.new(types[i], this.depositManager.getSpawnDeposit());
						break;
					}
				}
				
				if (ctype.total > ctype.max) {
				    var creeps = this.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == types[i]})
				    
				    while (creeps.length > ctype.max) {
				        creeps.pop().suicide();
				    }
				}
			}
		}
	}

};

CRoom.prototype.run = function() {
	for (var i in this.creeps) {
		this.creeps[i].act();
	}
}

module.exports = CRoom;