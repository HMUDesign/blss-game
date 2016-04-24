import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaServeStatic from 'koa-serve-static';

import logger from './lib/logger';
import engine from './engine';

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

const server = app.listen(process.env.PORT || 3000);
engine(server);
