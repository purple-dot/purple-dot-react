import toElemName from './to-elem-name';

describe('toElemName', () => {
  it('capitalizes each word in the placement type', () => {
    expect(toElemName('foo-bar')).toEqual('FooBar');
  });
});
