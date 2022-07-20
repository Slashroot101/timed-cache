const prefix = '__cached__';


export class TimedCache {
  defaultTtl = 5000;
  cacheValues = {};

  constructor(options = { defaultTtl: 60 * 1000}) {
    this.defaultTtl = options.defaultTtl || 60 * 1000;
  }

  get(key){
    return this.cacheValues[this.constructor.serializeKey(key)]?.value ?? null;
  }

  put(key, value, opts = {ttl: 60 * 1000, callback: null}){
    if(this.cacheValues[this.constructor.serializeKey(key)]){ throw new Error('Duplicate key was tried to inserted')}
    if(!key) return;
    const ttl = opts.ttl || this.defaultTtl;
    const callback = opts.callback ?? function(){};
    const cachedValue = this.cacheValues[this.constructor.serializeKey(key)];
    if(cachedValue){
      clearTimeout(cachedValue.timeoutHandle);
    }
    const timeoutHandle = setTimeout(() => {
      const entry = this.cacheValues[this.constructor.serializeKey(key)];
      console.log('Calling callback')
      this.cacheValues[this.constructor.serializeKey(key)].callback(entry.key, entry.value);
      delete this.cacheValues[this.constructor.serializeKey(key)];
    }, ttl);
    this.cacheValues[this.constructor.serializeKey(key)] = {value, timeoutHandle, callback};
  }
  

  remove(cacheKey){
    const key = this.constructor.serializeKey(cacheKey);
    const value = this.cacheValues[key];

    if(value){
      clearTimeout(value.timeoutHandle);
      delete this.cacheValues[key];
      value.callback(key, value.value);
    }
  }

  clear() {
    for (const entry in this.cacheValues) {
      if (entry in this.cacheValues) {
        clearTimeout(this.cacheValues[entry].handle);
      }
    }
    this.cacheValues = {};
  }

  size() {
    return (Object.keys(this.cacheValues).length);
  }

  static serializeKey(key){
    return `${prefix}${key}`;
  }
}