function PopulationManager(room) {
	this.room = room;
	this.population = 0;
	this.creeps = this.room.find(FIND_MY_CREEPS);
	this.populationLevelMultiplier = 1;

	this.typeDistribution = {
		CreepCarrier: {
			total: 0,
			goalPercentage: 0.2,
			currentPercentage: 0,
			max: 0,
			minExtensions: 0
		},
		CreepStarter: {
			total: 0,
			goalPercentage: 1,
			currentPercentage: 0,
			max: 0,
			minExtensions: 0
		},
		CreepMiner: {
			total: 0,
			goalPercentage: 0.2,
			currentPercentage: 0,
			max: 0,
			minExtensions: 0
		}
	};
	
	for(var i = 0; i < this.creeps.length; i++) {
		var creepType = this.creeps[i].memory.role;
		this.typeDistribution[creepType].total++;
	}

	for(var name in this.typeDistribution) {
		var curr = this.typeDistribution[name];
		this.typeDistribution[name].currentPercentage = curr.total / this.getTotalPopulation();
	}
};

PopulationManager.prototype.getType = function(type) {
	return this.typeDistribution[type];
};

PopulationManager.prototype.getTypes = function() {
	var types = [];
	for(var n in this.typeDistribution) {
		types.push(n);
	}
	return types;
};

PopulationManager.prototype.getTotalPopulation = function() {
	return this.creeps.length;
};

PopulationManager.prototype.getMaxPopulation = function() {
	var population = 0;
	for(var n in this.typeDistribution) {
		population += this.typeDistribution[n].max;
	}
	return population;
};

module.exports = PopulationManager;