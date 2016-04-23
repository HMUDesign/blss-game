require('babel-register')({
	presets: [ 'es2015-node5', 'stage-0' ],
});

require('./app');

process.on('unhandledRejection', function(error, promise) {
	console.error('Unhandled Rejection', promise);
	throw error;
});
