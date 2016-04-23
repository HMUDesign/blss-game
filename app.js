import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaServeStatic from 'koa-serve-static';

import logger from './lib/logger';

const app = new Koa();

app.use(logger);

let router = new KoaRouter();
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', (ctx, next) => {
	ctx.body = {};
});

app.use(koaServeStatic('public', {
	fallthrough: false,
}));

export default app.listen(3000);
