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
		
		socket.on('attack', (key) => {
			if (!player) {
				return;
			}
			
			state.attack(player, key);
			
			io.emit('state', key, state.get(key));
		});
		
		socket.on('reinforce', (key) => {
			if (!player) {
				return;
			}
			
			state.reinforce(player, key);
			
			io.emit('state', key, state.get(key));
		});
	});
};
