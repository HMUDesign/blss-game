/* globals jQuery */

var zoom = 25;

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
		this._center = null;
	}
	
	BLSS.prototype.setOrbit = function(key, orbit) {
		this._orbits[key] = orbit;
		
		return this;
	};
	
	BLSS.prototype.setObject = function(key, object) {
		this._objects[key] = object;
		
		if (!this._center) {
			this._center = key;
		}
		
		return this;
	};
	
	BLSS.prototype.center = function(key) {
		if (key === true) {
			key = this.selected();
		}
		
		if (key) {
			if (!this._objects[key]) {
				throw new Error('Unknown object: "' + key + '".');
			}
			
			this._center = key;
			
			return this.draw();
		}
		
		return this._center;
	};
	
	BLSS.prototype.draw = function() {
		if (!Object.keys(this._objects).length) {
			return null;
		}
		
		var scale = getScales(this._objects);
		scale.x.offset = this._objects[this._center].geographic.latitude;
		scale.y.offset = this._objects[this._center].geographic.longitude;
		
		var width  = this._context.canvas.width;
		var height = this._context.canvas.height;
		
		this._context.clearRect(0, 0, width, height);
		
		var getColor = createColor();
		Object.keys(this._objects).map(function(key) {
			var color = getColor();
			if (!this._orbits[key]) {
				return;
			}
			
			var orbit = this._orbits[key].orbit;
			
			this._context.strokeStyle = color;
			this._context.beginPath();
			
			orbit.map(function(spot, index) {
				var x = scale.x.scale(spot.geographic.latitude, zoom) * width;
				var y = scale.y.scale(spot.geographic.longitude, zoom) * height;
				
				if (index === 0) {
					this._context.moveTo(x, y);
				}
				else {
					this._context.lineTo(x, y);
				}
			}.bind(this));
			
			this._context.closePath();
			this._context.stroke();
		}.bind(this));
		
		var getColor = createColor();
		Object.keys(this._objects).map(function(key) {
			var color = getColor();
			var object = this._objects[key];
			
			var size = 30;
			if (key.indexOf('_') !== -1) {
				size /= 2;
			}
			
			var x = scale.x.scale(object.geographic.latitude, zoom) * width;
			var y = scale.y.scale(object.geographic.longitude, zoom) * height;
			
			this._context.fillStyle = color;
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
			this._context.fillText(object.name, x, y);
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
		if (!Object.keys(this._objects).length) {
			return null;
		}
		
		var scale = getScales(this._objects);
		scale.x.offset = this._objects[this._center].geographic.latitude;
		scale.y.offset = this._objects[this._center].geographic.longitude;
		
		var width  = this._context.canvas.width;
		var height = this._context.canvas.height;
		
		this._selected = Object.keys(this._objects).reverse().reduce(function(current, key) {
			if (!current) {
				var object = this._objects[key];
				
				var size = 30;
				if (key.indexOf('_') !== -1) {
					size /= 2;
				}
				
				var x = scale.x.scale(object.geographic.latitude, zoom) * width;
				var y = scale.y.scale(object.geographic.longitude, zoom) * height;
				
				if (Math.sqrt(Math.pow(x - coords.x, 2) + Math.pow(y - coords.y, 2)) < size) {
					return key;
				}
			}
			
			return current;
		}.bind(this), null);
		
		return this.draw();
	};
	
	BLSS.prototype._onScroll = function(out) {
		if (out) {
			zoom /= 1.1;
		}
		else {
			zoom *= 1.1;
		}
		
		return this.draw();
	};
	
	function getScales(objects) {
		var xs = Object.keys(objects).map(function(key) {
			return objects[key].geographic.latitude;
		}, this);
		
		var ys = Object.keys(objects).map(function(key) {
			return objects[key].geographic.longitude;
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
					event.preventDefault();
					return data._onClick({ x: event.offsetX, y: event.offsetY });
				});
				
				$(this).bind('mousewheel', function(event) {
					event.preventDefault();
					return data._onScroll(event.originalEvent.wheelDelta < 0);
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
