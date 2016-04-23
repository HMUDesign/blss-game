const debug = require('debug')('app:logger');

export default async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	
	debug(`${ ctx.method } ${ ctx.url }`, `${ ms }ms`);
};
