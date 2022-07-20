import {TimedCache} from '../src/index';

describe('SerializeKey', function() { 
  it('should return the serialized key', () => {
    const cache = new TimedCache();
    expect(cache.constructor.serializeKey('key')).toBe('__cached__key');
  });
});