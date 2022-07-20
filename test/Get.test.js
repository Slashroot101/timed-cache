import {TimedCache} from '../src/index';

describe('Get', () => {
  it('should return null when key is not in cache', () => {
    const cache = new TimedCache();
    expect(cache.get('test')).toBe(null);
  });

  it('should return value when key is in cache', () => {
    const cache = new TimedCache();
    cache.put('test', 'test');
    expect(cache.get('test')).toBe('test');
  });
});