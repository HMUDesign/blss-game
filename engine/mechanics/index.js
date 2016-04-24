import { factor } from './config.js';
import calculate from './calculate';

export default (object, date) => {
	let { x, y, z } = calculate(object, date);
	
	return {
		x: x * factor,
		y: y * factor,
		z: z * factor,
	};
};
