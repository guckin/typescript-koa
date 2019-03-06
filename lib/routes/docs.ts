import config from '../config';
import * as Koa from 'koa'; import * as path from 'path';

const swaggerFilePath = path.join(__dirname, '..', '..', '..', 'docs', 'swagger.json');
const swaggerFile = require(swaggerFilePath);
swaggerFile.info.version = config.version;

export = {
    '/': (ctx: Koa.Context) => ctx.body = swaggerFile,
    '/version': (ctx: Koa.Context) => ctx.body = config.version
};
