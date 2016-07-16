var CreepBase = {};

CreepBase.remember = function(key, value) {
	if(value === undefined) {
		return this.creep.memory[key];
	}

	this.creep.memory[key] = value;

	return value;
}

CreepBase.forget = function(key) {
	delete this.creep.memory[key];
}

module.exports = CreepBase;
