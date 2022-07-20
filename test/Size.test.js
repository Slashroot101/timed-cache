import {TimedCache} from '../src/index';

describe('Size', function() { 
    let cache = null;

    beforeEach(function() {
        cache = new TimedCache();
    });

    it('should return the valid size of the cache', () => {
      cache.put('key', 'value');
      cache.put('key2', 'value2');
      cache.put('key3', 'value3');
      
      expect(cache.size()).toBe(3);
    });

    it('should return 0 when the cache is empty', () => {
      expect(cache.size()).toBe(0);
    });
  }
);