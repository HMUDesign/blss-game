/* globals io */

$(document).ready(function() {
	var socket = io({ transports: [ 'websocket' ] });
	
	var canvas = $('#blss').blss();
	
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
	
	$('#draw').on('click', function() {
		canvas.blss('draw');
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
