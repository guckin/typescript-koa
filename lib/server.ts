require('source-map-support').install();

import * as path from 'path';
import * as Koa from 'koa';
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser';
import config from './config';

import * as log from './logger';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import { CatStore } from './types/CatStore.types';
import { CatStoreService } from './services/catstore.service';

import * as catRouting from './routes/cat';
import * as docRouting from './routes/docs'


const app = new Koa();
const db = new DynamoDB(
    config.localDev 
    ? config.dynamoDb.localParameters
    : config.dynamoDb.cloudParameters
)
const mapper: DataMapper = new DataMapper( {
    client: db,
    tableNamePrefix: config.dynamoDb.tablePrefix
});
const CatDataStore: CatStore = new CatStoreService(mapper);

app.use(bodyParser());
app.context.catDataStore = CatDataStore;
// ensure the table exists
app.context.catDataStore.ensureTableExists( (err: any) => {
    if (err) { log.error(err.stack) };
});
// setup our routes
const router = new Router();
catRouting.attachTo(router);
docRouting.attachTo(router);
// use routes
app.use(router.routes())
   .use(router.allowedMethods());
// export server for superTest:
export const server = app.listen(config.port, () => {
    log.info('Server listening on port ' + config.port);
});
