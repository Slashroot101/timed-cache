const prefix = '__cached__';


export default class TimedCache {
  ttl = 5000;
  cacheValues = {};

  constructor(options = { ttl: 60 * 1000}) {
    this.ttl = options.ttl || 60 * 1000;
  }

  get(key){
    return this.cacheValues.get(key) ?? null;
  }

  put(){

  }

  remove(){

  }

  getOrAdd(){

  }
}