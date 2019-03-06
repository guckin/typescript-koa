import * as Koa from 'koa';
import { postCat, getCat } from '../../providers/cat.provider';

export = {
    '/': {
      POST: [
        postCat
      ],
      GET: [
        getCat
      ]
    }
};
