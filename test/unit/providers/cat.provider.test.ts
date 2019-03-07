import { postCat, getCat } from '../../../lib/providers/cat.provider'
import { expect } from 'chai'

const sinon = require('sinon');

describe('cat.provider', async () => {

  let dataStore: any;
  let ctx: any;

  beforeEach(() => {
    dataStore = {};
    
    ctx =  {
      request: {
        body: {
          name: 'test'
        },
        query: {id: 'test'}
      },
      catDataStore: dataStore
    }
  });


  describe('postCat', async () => {
    it('400 when name is not provided in request body', async () => {
      ctx.request.body = {};
      await postCat(ctx);
      expect(ctx.body).to.have.property('error');
      expect(ctx.status).to.equal(400);
    });

    it('creates a cat', async () => {
      const cat = 'my cat';
      dataStore['createCat'] = sinon.fake.returns(cat);
      await postCat(ctx);
      expect(ctx.body).to.equal(cat);
      expect(ctx.status).to.equal(201);
    });

    it('500 when a failure occurs', async () => {
      dataStore['createCat'] = () => {throw 42}
      await postCat(ctx);
      expect(ctx.body).to.have.property('error');
      expect(ctx.status).to.equal(500);
    });
  });

  describe('getCat', async () => {
    it('gets a cat', async () => {
      const cat = 'my cat'
      dataStore['retrieveCat'] = sinon.fake.returns(cat);
      await getCat(ctx);
      expect(ctx.body).to.equal(cat)
      expect(ctx.status).to.equal(200)
    });
  });
});