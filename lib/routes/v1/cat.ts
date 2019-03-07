import { postCat, getCat } from '../../providers/cat.provider';
import * as Router from 'koa-router'

export = (router: Router) => {
  return router
    .get('/cats', getCat)
    .post('/cats', postCat)
};
