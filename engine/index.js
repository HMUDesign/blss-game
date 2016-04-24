import socketio from 'socket.io';
import getOrbits from './get-orbits';
import getLocations from './get-locations';
import state from './state';

export default (server) => {
	let io = socketio(server);
	state.init();
	
	io.set('transports', [ 'websocket' ]);
	
	io.on('connection', function(socket) {
		var player = null;
		
		socket.on('orbits', () => socket.emit('orbits', getOrbits()));
		socket.on('locations', () => socket.emit('locations', getLocations()));
		
		socket.on('authenticate', ({ id } = {}) => {
			if (!id) {
				id = Math.floor(Math.random() * 0xEEEEEE + 0x111111).toString(16);
			}
			
			player = { id };
			
			socket.emit('authenticate', player);
		});
		
		socket.on('attack', ({ key, location }) => {
			if (!player) {
				return;
			}
			
			let value = state.attack(player, location, key);
			if (value === true) {
				io.emit('state', key, state.get(key));
			}
			else {
				socket.emit('fail', value);
			}
		});
		
		socket.on('reinforce', ({ key, location }) => {
			if (!player) {
				return;
			}
			
			let value = state.reinforce(player, location, key);
			if (value === true) {
				io.emit('state', key, state.get(key));
			}
			else {
				socket.emit('fail', value);
			}
		});
	});
};
