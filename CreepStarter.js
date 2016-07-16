function CreepStarter(creep, resourceManager, depositManager) {
	this.creep = creep;
	this.resourceManager = resourceManager;
	this.depositManager = depositManager;
	this.resource = false;
};

CreepStarter.prototype.init = function() {
	this.remember('role', 'CreepStarter');

	this.resource = this.resourceManager.getClosestResource(this.creep);

	this.act();
};

CreepStarter.prototype.act = function() {

	
	if (this.creep.carry.energy < this.creep.carryCapacity) {
		
		if (this.creep.harvest(this.resource) == ERR_NOT_IN_RANGE) {
			this.creep.moveTo(this.resource);
		}
	} else {

		var spawn = this.depositManager.getSpawnDeposit();
		if (spawn) {
			if (this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(spawn);
			}
		}
	}
}

module.exports = CreepStarter;