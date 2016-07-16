function CreepMiner(creep, resourceManager) {
	this.creep = creep;
	this.resourceManager = resourceManager;
	this.resource = false;
};

CreepMiner.prototype.init = function() {

	this.remember('role', 'CreepMiner');

	if(!this.remember('source')) {
		var src = this.resourceManager.getClosestResource(this.creep, true);
		this.remember('source', src.id);
	}

	this.resource = this.resourceManager.getResourceById(this.remember('source'));

	this.act();
};

CreepMiner.prototype.act = function() {

	this.giveEnergy();

	if(this.creep.carry.energy == this.creep.carryCapacity) {
		return;
	}
	this.creep.moveTo(this.resource);
	this.creep.harvest(this.resource);
}

CreepMiner.prototype.giveEnergy = function() {
	var creepsNear = _.filter(this.creep.pos.findInRange(FIND_MY_CREEPS, 1), (c) => {
		return c.memory.role === 'CreepCarrier' && c.carry.energy < c.carryCapacity
	});

	for(var i in creepsNear){
		this.creep.transfer(creepsNear[i], RESOURCE_ENERGY);
	}
}

module.exports = CreepMiner;
