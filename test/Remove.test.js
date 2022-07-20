import {TimedCache} from '../src/index';

describe('Remove', () => {
  it('should remove the value from the cache', () => {
    const cache = new TimedCache();
    cache.put('key', 'value');
    cache.put('key2', 'value2');
    cache.put('key3', 'value3');
    cache.remove('key');
    expect(cache.size()).toBe(2);
   });

   it('should remove the value from the cache', () => {
    const cache = new TimedCache();
    cache.put('key', 'value');
    cache.put('key2', 'value2');
    cache.put('key3', 'value3');
    cache.remove('key');
    expect(cache.get('key')).toBe(null);
   });

   it('should remove the setTimeout handler after being removed', () => {
    const cache = new TimedCache();
    const callbackMock = jest.fn(() => {});
    cache.put('key', 'value', {callback: callbackMock, ttl: 1});
    cache.put('key2', 'value2');
    cache.put('key3', 'value3');
    cache.remove('key');
    expect(callbackMock).toHaveBeenCalledTimes(1);
   });
});