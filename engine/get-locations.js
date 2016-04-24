import { center } from './mechanics/config.js';
import objects from './mechanics/objects';
import mechanics from './mechanics';
import state from './state';

export let transform = (date, { name, key, orbital }, parent = { x: 0, y: 0, z: 0 }) => {
	let cartesian = mechanics(orbital, date);
	cartesian.x += parent.x;
	cartesian.y += parent.y;
	cartesian.z += parent.z;
	
	let geographic = center.add(cartesian.x, cartesian.y).toObject();
	
	return {
		key,
		name,
		geographic,
		cartesian,
		state: state.get(key),
	};
};

export let reduce = (date, objects, parent) => {
	return objects.reduce((list, object) => {
		let result = transform(date, object, parent);
		
		if (object.moons) {
			return list
				.concat(result)
				.concat(reduce(date, object.moons, result.cartesian))
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
		geographic: center.toObject(),
		cartesian: { x: 0, y: 0, z: 0 },
		state: {},
	} ]
		.concat(reduce(date, objects))
	;
};
