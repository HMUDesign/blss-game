const earthRadius = 6.371e6;
const radians = 180 / Math.PI;
const degrees = Math.PI / 180;

export default class LatLon {
	constructor(lat, lon) {
		this._lat = lat;
		this._lon = lon;
	}
	
	add(dx, dy) {
		let lat = this._lat + (dy / earthRadius) * radians;
		let lon = this._lon + (dx / earthRadius) * radians / Math.cos(this._lat * degrees);
		
		return new LatLon(lat, lon);
	}
	
	toObject() {
		return {
			latitude:  this._lat,
			longitude: this._lon,
		};
	}
}
