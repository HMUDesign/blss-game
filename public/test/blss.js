// var x = R * cos(lat) * cos(lon);
// var y = R * cos(lat) * sin(lon);
// var z = R * sin(lat);

/* globals jQuery */

var zoom = 1;

(function($) {
	var createColor = function(ratio) {
		ratio = ratio || (Math.sqrt(5) + 1) / 2;
		var hue = 0;
		
		return function() {
			hue += ratio;
			hue %= 1;
			
			return 'hsl(' + Math.floor(hue * 360) + ', 60%, 70%)';
		};
	};
	
	function BLSS(canvas) {
		this._context = canvas.getContext('2d');
		this._orbits = {};
		this._objects = {};
		this._selected = null;
	}
	
	BLSS.prototype.setOrbit = function(key, orbit) {
		// console.log('setOrbit', key, orbit);
		
		return this;
	};
	
	BLSS.prototype.setObject = function(key, object) {
		this._objects[key] = object;
		
		return this;
	};
	
	BLSS.prototype.draw = function() {
		var getColor = createColor();
		
		var scale = getScales(this._objects);
		scale.x.offset = this._objects.sun.latitude;
		scale.y.offset = this._objects.sun.longitude;
		
		var width  = this._context.canvas.width;
		var height = this._context.canvas.height;
		
		this._context.clearRect(0, 0, width, height);
		
		Object.keys(this._objects).map(function(key) {
			var object = this._objects[key];
			
			var size = 30;
			if (key.indexOf('_') !== -1) {
				size /= 2;
			}
			
			var x = scale.x.scale(object.latitude, zoom) * width;
			var y = scale.y.scale(object.longitude, zoom) * height;
			
			this._context.fillStyle = getColor();
			this._context.beginPath();
			this._context.arc(x, y, size, 0, 2 * Math.PI);
			this._context.closePath();
			this._context.fill();
			
			if (key === this._selected) {
				this._context.strokeStyle = 'black';
				this._context.stroke();
			}
			
			this._context.fillStyle = 'black';
			this._context.font = '16px sans-serif';
			this._context.fillText(key, x, y);
		}.bind(this));
		
		return this;
	};
	
	BLSS.prototype.selected = function(object) {
		if (object) {
			if (!this._objects[object]) {
				throw new Error('Unknown object: "' + object + '".');
			}
			
			this._selected = object;
			
			return this.draw();
		}
		
		return this._selected;
	};
	
	BLSS.prototype._onClick = function(coords) {
		var scale = getScales(this._objects);
		scale.x.offset = this._objects.sun.latitude;
		scale.y.offset = this._objects.sun.longitude;
		
		var width  = this._context.canvas.width;
		var height = this._context.canvas.height;
		
		this._selected = Object.keys(this._objects).reverse().reduce(function(current, key) {
			if (!current) {
				var object = this._objects[key];
				
				var size = 30;
				if (key.indexOf('_') !== -1) {
					size /= 2;
				}
				
				var x = scale.x.scale(object.latitude, zoom) * width;
				var y = scale.y.scale(object.longitude, zoom) * height;
				
				if (Math.sqrt(Math.pow(x - coords.x, 2) + Math.pow(y - coords.y, 2)) < size) {
					return key;
				}
			}
			
			return current;
		}.bind(this), null);
		
		return this.draw();
	};
	
	function getScales(objects) {
		var xs = Object.keys(objects).map(function(key) {
			return objects[key].latitude;
		}, this);
		
		var ys = Object.keys(objects).map(function(key) {
			return objects[key].longitude;
		}, this);
		
		var x = getScale(xs);
		var y = getScale(ys);
		
		x.factor = y.factor = Math.min(x.factor, y.factor);
		
		return {
			x: x,
			y: y,
		};
	}
	
	function getScale(values) {
		var min = values.reduce(function(a, b) {
			return Math.min(a, b);
		});
		
		var max = values.reduce(function(a, b) {
			return Math.max(a, b);
		});
		
		return {
			offset: (max + min) / 2,
			factor: 1 / (max - min),
			scale: function(value, zoom) {
				zoom = zoom || 1;
				
				return -((value - this.offset) * this.factor * zoom) + 0.5;
			},
		};
	}
	
	$.fn.blss = function(action) {
		var args = Array.prototype.slice.call(arguments, 1);
		
		var getter = false;
		var result = this.each(function() {
			var data = $(this).data('blss');
			
			if (!data) {
				data = new BLSS(this);
				
				$(this).data('blss', data);
				$(this).on('click', function(event) {
					return data._onClick({ x: event.offsetX, y: event.offsetY });
				});
			}
			
			if (!action) {
				return;
			}
			
			if (typeof data[action] !== 'function' || action[0] === '_') {
				throw new Error('Invalid action: "' + action + '".');
			}
			
			var result = data[action].apply(data, args);
			getter = result === data ? false : result;
		});
		
		return getter || result;
	};
}(jQuery));
