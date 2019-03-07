import { Cat } from '../../../lib/models/cat.model'
import { expect } from 'chai'
describe('Cat model', () => {

  it('can create an instance of Cat', () => {
    const cat =  new Cat();
    expect(cat).to.not.equals(null);
  });

  it('generates id auth on create', () => {
    const cat = new Cat();
    expect(cat).to.have.property('id')
  });
});