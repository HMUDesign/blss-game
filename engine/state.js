import objects from './mechanics/objects';

let state = {};

function init() {
	objects.map(({ key }) => {
		state[key] = {
			owner: null,
			health: 0,
		};
	});
}

function get(key) {
	return state[key];
}

function attack(player, key) {
	if (!state[key]) {
		return;
	}
	
	if (state[key].owner === player.id) {
		return;
	}
	
	state[key].health -= 1;
	state[key].health = Math.max(0, state[key].health);
	
	if (state[key].health === 0) {
		state[key].owner = null;
	}
}

function reinforce(player, key) {
	if (!state[key]) {
		return;
	}
	
	if (!state[key].owner) {
		state[key].owner = player.id;
	}
	
	if (state[key].owner !== player.id) {
		return;
	}
	
	state[key].health += 1;
	state[key].health = Math.min(5, state[key].health);
}

export default {
	init,
	get,
	attack,
	reinforce,
};
