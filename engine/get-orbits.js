import { center } from './mechanics/config.js';
import objects from './mechanics/objects';
import mechanics from './mechanics';

let transform = (date, { name, key, orbital }, parent = { x: 0, y: 0, z: 0 }) => {
	let orbit = [];
	let cartesian = mechanics(orbital, date);
	let geographic = center.add(cartesian.x, cartesian.y).toObject();
	
	let segments = Math.pow(2, 5);
	
	if (key === 'halleys-comet') {
		segments = Math.pow(2, 12);
	}
	
	for (let i = 0; i <= segments; i++) {
		date = new Date(date.getTime() + (orbital.period / segments) * 86400000);
		
		let cartesian = mechanics(orbital, date);
		cartesian.x += parent.x;
		cartesian.y += parent.y;
		cartesian.z += parent.z;
		
		let geographic = center.add(cartesian.x, cartesian.y).toObject();
		
		orbit.push({
			geographic,
			cartesian,
		});
	}
	
	return {
		key,
		name,
		geographic,
		cartesian,
		orbit,
	};
};

let reduce = (date, objects, parent) => {
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
	
	return reduce(date, objects);
};
