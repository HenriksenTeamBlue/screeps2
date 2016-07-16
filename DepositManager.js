var CONSTS = {
	EMPTY_LEVEL: 0.5
};

function DepositManager(room) {

	this.room = room;
	this.deposits = this.room.find(FIND_MY_STRUCTURES, {
		filter: (structure) =>
			structure.structureType == STRUCTURE_EXTENSION
	});

	this.spawns = [];
	for (var n in Game.spawns) {
		var s = Game.spawns[n];
		if (s.room == this.room) {
			this.spawns.push(s);
		}
	}
};

DepositManager.prototype.getSpawnDeposit = function() {
	return this.spawns.length != 0 ? this.spawns[0] : false;
};

DepositManager.prototype.getEmptyDeposits = function() {
	var empty = [];
	var len = this.deposits.length;
	for (var i = 0; i < len; i++) {
		var res = this.deposits[i];
		if (this.isEmptyDeposit(res)) {
			empty.push(res);
		}
	}

	return empty;
};

DepositManager.prototype.isEmptyDeposit = function(deposit) {
	return deposit.energy / deposit.energyCapacity < CONSTS.EMPTY_LEVEL;
};

DepositManager.prototype.getEmptyDepositOnId = function(id) {
	var resource = Game.getObjectById(id);
	return resource && this.isEmptyDeposit(resource) ? resource : false;
};

DepositManager.prototype.getClosestEmptyDeposit = function(creep) {
	var resources = this.getEmptyDeposits();
	return resources.length > 0 ? creep.pos.findClosestByRange(resources) : this.getSpawnDeposit();
};

DepositManager.prototype.energy = function() {
	var energy = 0;
	var resources = this.deposits;

	for (var i = 0; i < resources.length; i++) {
		var res = resources[i];
		energy += res.energy;
	}

	for (var i = 0; i < this.spawns.length; i++) {
		energy += this.spawns[i].energy;
	}

	return energy;
};

DepositManager.prototype.energyCapacity = function() {
	var energyCapacity = 0;
	var resources = this.deposits;
	for (var i = 0; i < resources.length; i++) {
		var res = resources[i];
		energyCapacity += res.energyCapacity;
	}

	for (var i = 0; i < this.spawns.length; i++) {
		energyCapacity += this.spawns[i].energyCapacity;
	}

	return energyCapacity;
};

DepositManager.prototype.getFullDeposits = function() {
	var full = [];
	var deposits = this.deposits;
	for (var i = 0; i < deposits.length; i++) {
		var deposit = deposits[i];
		if (deposit.energy == deposit.energyCapacity) {
			full.push(deposit);
		}
	}
	return full;
};

module.exports = DepositManager;