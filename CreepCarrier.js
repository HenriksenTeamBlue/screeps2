function CreepCarrier(creep, depositManager) {
	this.creep = creep;
	this.depositManager = depositManager;
}

CreepCarrier.prototype.init = function() {
	this.remember('role', 'CreepCarrier');
	this.remember('mode', 'harvest');

	if(!this.remember('miner')) {
		var miner = this.findMiners()[0];
		this.remember('miner', miner.name);
		miner.memory.carriers = (miner.memory.carriers ? miner.memory.carriers : 0) + 1;
	}

	this.miner = Game.creeps[this.remember('miner')];

	this.act();
}

CreepCarrier.prototype.findMiners = function() {

    return this.creep.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == 'CreepMiner' && !creep.memory.carriers || creep.memory.carriers < 3 });
}

CreepCarrier.prototype.act = function() {

	if(this.remember('mode') == 'deposit' && this.creep.carry.energy == 0) {
        this.remember('mode', 'harvest');
	} else if (this.remember('mode') == 'harvest' && this.creep.carry.energy == this.creep.carryCapacity) {
	    this.remember('mode', 'deposit');
	}

	if (this.remember('mode') == 'harvest') {
	    this.creep.moveTo(Game.creeps[this.remember('miner')]);
	} else {
	    var spawn = this.depositManager.getSpawnDeposit();
		if (spawn && spawn.energy < spawn.energyCapacity) {

			if (this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				this.creep.moveTo(spawn);
			}
		} else {
			if (this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.creep.room.controller);
            }
		}
	}

}

module.exports = CreepCarrier;