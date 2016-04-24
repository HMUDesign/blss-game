import objects from './mechanics/objects';
import getLocations from './get-locations';
import { degrees } from './mechanics/config.js';

let state = {};

function getObject(key) {
	let locations = getLocations();
	
	for (let object of locations) {
		if (object.key === key) {
			return object;
		}
	}
	
	return false;
}

function isRange(key, location) {
	let object = getObject(key);
	
	if (distanceBetweenPoints(object.geographic, location) > 75) {
		return false;
	}
	
	return true;
}

function init() {
	let clean = ({ key, moons }) => {
		state[key] = {
			owner: null,
			health: 0,
		};
		
		if (moons) {
			moons.map(clean);
		}
	};
	
	clean({ moons: objects });
}

function get(key) {
	return state[key];
}

function attack(player, location, key) {
	if (!state[key]) {
		return 'unknown key: ' + key;
	}
	
	if (state[key].owner && state[key].owner === player.id) {
		return 'not yours';
	}
	
	/*
	if (!isRange(key, location)) {
		return 'not in range';
	}
	*/
	
	state[key].health -= 1;
	state[key].health = Math.max(0, state[key].health);
	
	if (state[key].health === 0) {
		state[key].owner = null;
	}
	
	return true;
}

function reinforce(player, location, key) {
	if (!state[key]) {
		return 'unknown key: ' + key;
	}
	
	if (state[key].owner && state[key].owner !== player.id) {
		return 'not yours';
	}
	
	/*
	if (!isRange(key, location)) {
		return 'not in range';
	}
	*/
	
	if (!state[key].owner) {
		state[key].owner = player.id;
	}
	
	state[key].health += 1;
	state[key].health = Math.min(5, state[key].health);
	
	return true;
}

export default {
	init,
	get,
	attack,
	reinforce,
};

function distanceBetweenPoints(a, b) {
	var R = 6371000;
	var φ1 = a.latitude * degrees;
	var φ2 = b.latitude * degrees;
	var Δφ = (b.latitude - a.latitude) * degrees;
	var Δλ = (b.longitude - a.longitude) * degrees;
	
	var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	
	return R * c;
}
