import config from '../config';
import * as Koa from 'koa'; import * as path from 'path'; 
import * as Router from 'koa-router';


export function attachTo(router: Router) {
    router
        .all('/', (ctx: Koa.Context) => {
            ctx.body = {healthCheck: 'ok'};
            ctx.status = 200;
        })
        .all('/version', (ctx: Koa.Context) => {
            ctx.body = config.version;
            ctx.status = 200;
        });
};
