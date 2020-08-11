const config = require('config');

class Node {
  constructor(key, value, expires, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.expires = expires;
    this.next = next;
    this.prev = prev;
  }
}

class Cache {
  constructor(limit = config.cache.limit, timeoutInSeconds = config.cache.timeoutInSeconds) {
    this._limit = limit;
    this._timeoutInSeconds = timeoutInSeconds;
    this._cache = {};
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  get(key) {
    const node = this._cache[key];

    if (!node) {
      return null;
    }

    const now = new Date();
    if (node.expires < now) {
      this.remove(key)
      return null;
    }

    const { value } = node;
    this.remove(key)
    this.set(key, value);
    return value;
  }

  set (key, value) {
    if (this._size === this._limit) {
      this.remove(this._tail.key)
    }

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this._timeoutInSeconds);

    if (!this._head) {
      this._head = this._tail = new Node(key, value, expires);
    } else {
      const node = new Node(key, value, expires, this._head);
      this._head.prev = node;
      this._head = node;
    }

    this._cache[key] = this._head;
    this._size += 1;
  }

  remove(key){
    const node = this._cache[key];
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this._head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this._tail = node.prev
    }

    delete this._cache[key];
    this._size -= 1;
  }
}

module.exports = Cache;
