import { postCat, getCat } from '../providers/cat.provider';
import * as Router from 'koa-router'

export function attachTo(router: Router) {
  return router
    .get('/v1/cats', getCat)
    .post('/v1/cats', postCat)
};
