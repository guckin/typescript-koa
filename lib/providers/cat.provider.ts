import * as Koa from 'koa';
import * as log from '../logger';
import * as joi from 'joi';
import { CatStoreService } from '../services/catstore.service';
import { CatStore } from '../types/catstore.types';
import config from '../config';
// import * as uuid from 'uuid';
const uuidv4 = require('uuid/v4');

export async function postCat(ctx: Koa.Context) {
  const schema: any = joi.object().keys({
            name: joi.string().required()
        }).required();
  const body = ctx.request.body;
  const errors = schema.validate(body, {abortEarly: false});

  if (errors.errors) {
    ctx.status = 400;
    ctx.body = {error: errors};
    return;
  }
  try {
    const id: string = uuidv4();
    const data: any = await ctx.catDataStore.createCat(id, body.name);

    ctx.status = 201;
    ctx.body = data;
  } catch (err) {
      ctx.status = 500;
      ctx.body = {error: err};
      log.error(err);
      log.error(err.stack);
      return;
  }
}

export async function getCat(ctx: Koa.Context) {
  try {
    const qparms: any = ctx.request.query;
    console.log(qparms);
    const data: any = await ctx.catDataStore.retrieveCat(qparms.id);
    ctx.body = data;
    ctx.status = 200
  } catch (err) {
    ctx.status = 500;
    ctx.body = {error: err};
    log.error(err);
    log.error(err.stack);
    return;
  }
}
