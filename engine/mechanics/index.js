import calculate from './calculate';

const factor = 1 / 142110612.24489793;

export default (object, date) => {
	let { x, y, z } = calculate(object, date);
	
	return {
		x: x * factor,
		y: y * factor,
		z: z * factor,
	};
};
