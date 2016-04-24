/* globals io */

$(document).ready(function() {
	var socket = io({ transports: [ 'websocket' ] });
	
	var canvas = $('#blss').blss();
	
	$(window).on('resize', function() {
		var width = $(this).width();
		var height = $(this).height();
		
		var data = canvas.data('blss');
		data._context.canvas.width = width;
		data._context.canvas.height = height;
		
		return canvas.blss('draw');
	}).trigger('resize');
	
	$('#getOrbits').on('click', function() {
		socket.emit('orbits');
	});
	
	$('#getLocations').on('click', function() {
		socket.emit('locations');
	});
	
	$('#authenticate').on('click', function() {
		socket.emit('authenticate');
	});
	
	$('#attack').on('click', function() {
		socket.emit('attack', { key: canvas.blss('selected') });
	});
	
	$('#reinforce').on('click', function() {
		socket.emit('reinforce', { key: canvas.blss('selected') });
	});
	
	$('#center').on('click', function() {
		canvas.blss('center', true);
	});
	
	socket.on('orbits', function(orbits) {
		orbits.map(function(orbit) {
			canvas.blss('setOrbit', orbit.key, orbit);
		});
		
		return canvas.blss('draw');
	});
	
	socket.on('locations', function(objects) {
		objects.map(function(object) {
			canvas.blss('setObject', object.key, object);
		});
		
		return canvas.blss('draw');
	});
});
