import {TimedCache} from '../src/index';

describe('Put', () => {
  beforeAll(() => {
    jest.spyOn(global, 'setTimeout');
  });

  beforeEach(() => { 
    jest.clearAllMocks();
  });

  it('should put the value in the cache', () => {
    const cache = new TimedCache();
    cache.put('key', 'value');
    expect(cache.get('key')).toBe('value');
  });

  it('should use a callback if provided', async () => {
    const cache = new TimedCache();
    const callbackMock = jest.fn();
    cache.put('key', 'value', {callback: callbackMock, ttl: 0});
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  it('should use the default ttl if not provided', () => {
    const cache = new TimedCache();
    const callbackMock = jest.fn();
    cache.put('key', 'value', {callback: callbackMock});
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 60 * 1000);
  });

  it('should throw an error if the value already exists', () => {
    const cache = new TimedCache();
    cache.put('key', 'value');
    expect(() => {
      cache.put('key', 'value');
    }).toThrowError('Duplicate key was tried to inserted');
  });
});