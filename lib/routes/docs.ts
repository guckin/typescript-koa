import config from '../config';
import * as Koa from 'koa'; import * as path from 'path'; 
import * as Router from 'koa-router';


const swaggerFilePath = path.join(__dirname, '..', '..', '..', 'docs', 'swagger.json');
const swaggerFile = require(swaggerFilePath);
swaggerFile.info.version = config.version;

export = (router: Router) => {
    router
        .all('/', (ctx: Koa.Context) => {
            ctx.body = swaggerFile;
        })
        .all('/version', (ctx: Koa.Context) => {
            ctx.body = config.version;
        });
};
