import { degrees } from './config.js';

let objects = [
	{
		name: 'Mercury',
		orbital: {
			semimajor: 57909050000,
			eccentricity: 0.20563,
			period: 87.969,
			anomaly: 174.796 * degrees,
			inclination: 7.005 * degrees,
			ascending: 48.331 * degrees,
			argument: 29.124 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0,
			radius: 2439700,
		},
	},
	{
		name: 'Venus',
		orbital: {
			semimajor: 108208000000,
			eccentricity: 0.0067,
			period: 224.701,
			anomaly: 50.115 * degrees,
			inclination: 3.39458 * degrees,
			ascending: 76.678 * degrees,
			argument: 55.186 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0,
			radius: 6051800,
		},
	},
	{
		name: 'Earth',
		orbital: {
			semimajor: 149598261000,
			eccentricity: 0.01671123,
			period: 365.256363,
			anomaly: 355.53 * degrees,
			inclination: 7.155 * degrees,
			ascending: -11.26064 * degrees,
			argument: 102.94719 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0.0033528,
			radius: 6371000,
		},
		moons: [
			{
				name: 'Moon',
				orbital: {
					semimajor: 384400000,
					eccentricity: 0.0554,
					period: 27.322,
					anomaly: 306.67117 * degrees,
					inclination: 5.16 * degrees,
					ascending: 125.08 * degrees,
					argument: 318.15 * degrees,
					epoch: new Date('January 1 2000 12:00:00 UTC'),
				},
				physical: {
					flattening: 0.00125,
					radius: 1737100,
				},
			},
		],
	},
	{
		name: 'Mars',
		orbital: {
			semimajor: 227939100000,
			eccentricity: 0.0935,
			period: 686.971,
			anomaly: 19.3564 * degrees,
			inclination: 1.85 * degrees,
			ascending: 49.562 * degrees,
			argument: 286.537 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0.00589,
			radius: 3389500,
		},
	},
	{
		name: 'Ceres',
		orbital: {
			semimajor: 414010000000,
			eccentricity: 0.075823,
			period: 1681.63,
			anomaly: 95.9891 * degrees,
			inclination: 10.593 * degrees,
			ascending: 80.3293 * degrees,
			argument: 72.522 * degrees,
			epoch: new Date('December 09 2014 12:00:00 UTC'),
		},
		physical: {
			radius: 476200,
		},
	},
	{
		name: 'Jupiter',
		orbital: {
			semimajor: 778547200000,
			eccentricity: 0.048775,
			period: 4332.59,
			anomaly: 18.818 * degrees,
			inclination: 1.305 * degrees,
			ascending: 100.492 * degrees,
			argument: 275.066 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0.06487,
			radius: 69911000,
		},
		moons: [
			{
				name: 'Io',
				orbital: {
					semimajor: 421800000,
					eccentricity: 0.0041,
					period: 1.761875,
					anomaly: 0 * degrees, // unavailable
					inclination: 0.036 * degrees,
					ascending: 43.977 * degrees,
					argument: 84.129 * degrees,
					epoch: new Date('January 1 2000 12:00:00 UTC'),
				},
				physical: {
					radius: 1821600,
				},
			},
			{
				name: 'Europa',
				orbital: {
					semimajor: 671100000,
					eccentricity: 0.0094,
					period: 3.543,
					anomaly: 0 * degrees, // unavailable
					inclination: 0.466 * degrees,
					ascending: 219.106 * degrees,
					argument: 88.97 * degrees,
					epoch: new Date('January 1 2000 12:00:00 UTC'),
				},
				physical: {
					radius: 969.84,
				},
			},
			{
				name: 'Ganymede',
				orbital: {
					semimajor: 1070400000,
					eccentricity: 0.0013,
					period: 7.155,
					anomaly: 0 * degrees, // unavailable
					inclination: 0.177 * degrees,
					ascending: 63.552 * degrees,
					argument: 192.417 * degrees,
					epoch: new Date('January 1 2000 12:00:00 UTC'),
				},
				physical: {
					radius: 2631200,
				},
			},
			{
				name: 'Callisto',
				orbital: {
					semimajor: 1882700000,
					eccentricity: 0.0074,
					period: 16.69,
					anomaly: 0 * degrees, // unavailable
					inclination: 0.192 * degrees,
					ascending: 298.848 * degrees,
					argument: 52.643 * degrees,
					epoch: new Date('January 1 2000 12:00:00 UTC'),
				},
				physical: {
					radius: 2410300,
				},
			},
		],
	},
	{
		name: 'Saturn',
		orbital: {
			semimajor: 1443449370000,
			eccentricity: 0.055723219,
			period: 10759.22,
			anomaly: 320.34675 * degrees,
			inclination: 2.78524 * degrees,
			ascending: 113.642811 * degrees,
			argument: 336.013862 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0.09796,
			radius: 58232000,
		},
		moons: [
			{
				name: 'Titan',
				orbital: {
					semimajor: 1221870000,
					eccentricity: 0.0288,
					period: 15.945,
					anomaly: 0 * degrees, // unavailable
					inclination: 0.34854 * degrees,
					ascending: 0 * degrees, // unavailable
					argument: 0 * degrees, // unavailable
					epoch: new Date('January 1 2000 12:00:00 UTC'),
				},
				physical: {
					radius: 5274700,
				},
			},
		],
	},
	{
		name: 'Uranus',
		orbital: {
			semimajor: 2870671400000,
			eccentricity: 0.47220087,
			period: 30687.15,
			anomaly: 142.2386 * degrees,
			inclination: 0.772556 * degrees,
			ascending: 73.999342 * degrees,
			argument: 96.998857 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0.0229,
			radius: 25362000,
		},
	},
	{
		name: 'Neptune',
		orbital: {
			semimajor: 4498542600000,
			eccentricity: 0.00867797,
			period: 60190.03,
			anomaly: 259.885588 * degrees,
			inclination: 1.767975 * degrees,
			ascending: 131.782974 * degrees,
			argument: 273.219414 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			flattening: 0.0171,
			radius: 24622000,
		},
	},
	{
		name: 'Pluto',
		orbital: {
			semimajor: 5874000000000,
			eccentricity: 0.244671664,
			period: 90465,
			anomaly: 14.86012204 * degrees,
			inclination: 17.151394 * degrees,
			ascending: 110.28683 * degrees,
			argument: 113.76349 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			radius: 1184000,
		},
	},
	{
		name: 'Halley\'s Comet',
		orbital: {
			semimajor: 2667950010000,
			eccentricity: 0.96714291,
			period: 27510,
			anomaly: 139.4753 * degrees,
			inclination: 162.26269 * degrees,
			ascending: 58.42008 * degrees,
			argument: 111.33249 * degrees,
			epoch: new Date('January 1 2000 12:00:00 UTC'),
		},
		physical: {
			radius: 5500,
		},
	},
	{
		name: 'Makemake',
		orbital: {
			semimajor: 6838866660 * 1000,
			eccentricity: 0.15586,
			period: 112897,
			anomaly: 156.353 * degrees,
			inclination: 29.00685 * degrees,
			ascending: 79.3659 * degrees,
			argument: 297.240 * degrees,
			epoch: new Date('December 09 2014 12:00:00 UTC'),
		},
		physical: {
			radius: 715000,
		},
	},
	{
		name: 'Eris',
		orbital: {
			semimajor: 1.01398933 * Math.pow(10, 13),
			eccentricity: 0.44068,
			period: 203830,
			anomaly: 204.16 * degrees,
			inclination: 44.0445 * degrees,
			ascending: 35.9531 * degrees,
			argument: 150.977 * degrees,
			epoch: new Date('December 09 2014 12:00:00 UTC'),
		},
		physical: {
			radius: 1163000,
		},
	},
	{
		name: 'Haumea',
		orbital: {
			semimajor: 6.46532078 * Math.pow(10, 12),
			eccentricity: 0.19126,
			period: 103774,
			anomaly: 209.07 * degrees,
			inclination: 28.19 * degrees,
			ascending: 121.79 * degrees,
			argument: 240.20 * degrees,
			epoch: new Date('December 09 2014 12:00:00 UTC'),
		},
		physical: {
			radius: 620000,
		},
	},
];

export default objects.map(clean());

function clean(prefix = '') {
	return (object) => {
		object.key = prefix + slugify(object.name);
		
		if (object.moons) {
			object.moons = object.moons.map(clean(object.key + '_'));
		}
		
		return object;
	};
}

function slugify(name) {
	return name.toLowerCase()
		.replace(/\s+/g, '-')      // Replace spaces with -
		.replace(/\-\-+/g, '-')    // Replace multiple - with single -
		.replace(/[^\w\-]+/g, '')  // Remove all non-word chars
		.replace(/^-+/, '')        // Trim - from start of text
		.replace(/-+$/, '');       // Trim - from end of text
}
