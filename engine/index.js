import socketio from 'socket.io';
import getOrbits from './get-orbits';
import getLocations from './get-locations';

export default (server) => {
	let io = socketio(server);
	
	io.set('transports', [ 'websocket' ]);
	
	io.on('connection', function(socket) {
		socket.on('orbits', () => socket.emit('orbits', getOrbits()));
		socket.on('locations', () => socket.emit('locations', getLocations()));
	});
	
	/*
	setInterval(() => {
		io.emit('locations', getLocations());
	}, 1000);
	*/
};
