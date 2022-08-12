import decodeId from './decode-id';

describe('decodeId', () => {
  it('returns the ID if its an integer', () => {
    expect(decodeId(123)).toEqual(123);
  });

  it('returns the ID if its an integer string', () => {
    expect(decodeId('123')).toEqual('123');
  });

  it('returns the ID if its a gid', () => {
    expect(decodeId('gid://shopify/Product/123')).toEqual('123');
  });

  it('returns the ID if its a base64 encoded gid', () => {
    expect(decodeId(btoa('gid://shopify/Product/123'))).toEqual('123');
  });
});
