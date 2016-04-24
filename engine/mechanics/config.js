import LatLon from './lib/latlon.js';
import config from '../../config.json';

export let degrees = Math.PI / 180;

export let center = new LatLon(...config.center);
export let factor = 1 / config.scale;
export let rotate = config.rotate * degrees;
