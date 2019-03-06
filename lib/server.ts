require('newrelic');
require('source-map-support').install();

import * as path from 'path';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import config from './config';

import { log } from '@dat/node-util';
import { koaAuth as auth } from '@dat/node-auth';
import { DatRouter, ErrorHandler, RouteMetrics } from '@dat/koa-util';
import { CatStore } from './types/CatStore.types';
import { CatStoreService } from './services/catstore.service';

const app = new Koa();

log.setLevel(config.logLevel);

app.use(ErrorHandler(config.testFeaturesEnabled));
if (config.reportMetrics) { app.use(RouteMetrics()); }

app.use(bodyParser());
app.use(auth.auth(config.oAuth2Runtime));

const CatDataStore: CatStore = new CatStoreService();
app.context.catDataStore = CatDataStore;
app.context.catDataStore.ensureTableExists( (err: any) => {
    if (err) { log.error(err.stack) };
});
// setup our routes
const router = DatRouter(path.resolve(__dirname, '../lib/routes'));
app.use(router.routes())
   .use(router.allowedMethods());

// export server for superTest:
export const server = app.listen(config.port, () => {
    log.info('Server listening on port ' + config.port);
});
