const sinon = require('sinon');

export function createMockInstance(klass: any, overrides: object): any{
  return sinon.createStubInstance(klass, overrides);
} 