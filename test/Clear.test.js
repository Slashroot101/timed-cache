import {TimedCache} from '../src/index';

describe('Clear', () => {
  it('should clear the cache when it has entries', () =>{
    const cache = new TimedCache();
    cache.put('test', 'test');
    cache.clear();
    expect(cache.size()).toBe(0);
  });

  it('should clear the cache when it has no entries', () => {
    const cache = new TimedCache();
    cache.clear();
    expect(cache.size()).toBe(0);
  });
});