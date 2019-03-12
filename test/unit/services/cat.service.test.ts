import { CatStoreService } from '../../../lib/services/catstore.service'
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { createMockInstance } from '../../testObjects'
import { expect } from 'chai'

const sinon = require('sinon');

describe('cat.service', async () => {

  let service: CatStoreService;
  let mockMapper: DataMapper;
  let overrides: any;

  beforeEach(() => {
    // Not sure how to remove coupleing
    overrides = {
      put: 42,
      get: 42 
    }
    mockMapper = createMockInstance(DataMapper, overrides);
    service = new CatStoreService(mockMapper);
  });


  describe('createCat', async () => {
    it('returns a cat on completion', async () =>{
      var test = await service.createCat('test', 'test');
      expect(test).to.be.equal(overrides.put);
    });
  });

  describe('retrieveCat', async () => {
  });
});