const { Cache } = require('../utils')

describe('Cache', () => {
  test('should save value to cache and increase cache size', async () => {
    const cache = new Cache(2, 60);

    const value = 'RANDOM_VALUE';

    cache.set('TEST_KEY', value);

    expect(cache.get('TEST_KEY')).toEqual('RANDOM_VALUE');
    expect(cache._size).toEqual(1);
    expect(cache._limit).toEqual(2);
    expect(cache._timeoutInSeconds).toEqual(60);
  });

  test('should save 4 values to cache and maintain limit', async () => {
    const cache = new Cache(2, 60);

    const value1 = 'VALUE_1';
    const value2 = 'VALUE_2';
    const value3 = 'VALUE_3';
    const value4 = 'VALUE_4';

    cache.set('TEST_KEY_1', value1);
    cache.set('TEST_KEY_2', value2);
    cache.set('TEST_KEY_3', value3);
    cache.set('TEST_KEY_4', value4);

    expect(cache.get('TEST_KEY_1')).toBeFalsy();
    expect(cache.get('TEST_KEY_2')).toBeFalsy();
    expect(cache.get('TEST_KEY_3')).toEqual('VALUE_3');
    expect(cache.get('TEST_KEY_4')).toEqual('VALUE_4');
    expect(cache._size).toEqual(2);
    expect(cache._limit).toEqual(2);
  });

  test('should save 5 values to cache and keep last used', async () => {
    const cache = new Cache(3, 60);

    const value1 = 'VALUE_1';
    const value2 = 'VALUE_2';
    const value3 = 'VALUE_3';
    const value4 = 'VALUE_4';
    const value5 = 'VALUE_5';

    cache.set('TEST_KEY_1', value1);
    cache.set('TEST_KEY_2', value2);
    cache.set('TEST_KEY_3', value3);
    cache.get('TEST_KEY_1');
    cache.set('TEST_KEY_4', value4);
    cache.set('TEST_KEY_5', value5);

    expect(cache.get('TEST_KEY_1')).toEqual('VALUE_1');
    expect(cache.get('TEST_KEY_2')).toBeFalsy();
    expect(cache.get('TEST_KEY_3')).toBeFalsy();
    expect(cache.get('TEST_KEY_4')).toEqual('VALUE_4');
    expect(cache.get('TEST_KEY_5')).toEqual('VALUE_5');
    expect(cache._size).toEqual(3);
    expect(cache._limit).toEqual(3);
  });

  test('should save 3 values and remove expired', async () => {
    const cache = new Cache(3, 3);

    const value1 = 'VALUE_1';
    const value2 = 'VALUE_2';
    const value3 = 'VALUE_3';

    cache.set('TEST_KEY_1', value1);
    cache.set('TEST_KEY_2', value2);

    await new Promise(resolve => setTimeout(() => resolve(), 4000))

    cache.set('TEST_KEY_3', value3);
    expect(cache.get('TEST_KEY_1')).toBeFalsy();
    expect(cache.get('TEST_KEY_2')).toBeFalsy();
    expect(cache.get('TEST_KEY_3')).toEqual('VALUE_3');
  });
});
