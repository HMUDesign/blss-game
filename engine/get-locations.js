import { center } from './mechanics/config.js';
import objects from './mechanics/objects';
import mechanics from './mechanics';
import state from './state';

let transform = (date, { name, key, orbital }, parent = { x: 0, y: 0, z: 0 }) => {
	let position = mechanics(orbital, date);
	position.x += parent.x;
	position.y += parent.y;
	position.z += parent.z;
	
	let { latitude, longitude } = center.add(position.x, position.y).toObject();
	
	return {
		name,
		key,
		latitude,
		longitude,
		position,
		state: state.get(key),
	};
};

let reduce = (date, objects, parent) => {
	return objects.reduce((list, object) => {
		let result = transform(date, object, parent);
		
		if (object.moons) {
			return list
				.concat(result)
				.concat(reduce(date, object.moons, result.position))
			;
		}
		
		return list.concat(result);
	}, []);
};

export default () => {
	const date = new Date();
	return [ {
		key: 'sun',
		name: 'Sun',
		latitude: center.toObject().latitude,
		longitude: center.toObject().longitude,
	} ]
		.concat(reduce(date, objects))
		.map((object) => {
			return object;
		})
	;
};
