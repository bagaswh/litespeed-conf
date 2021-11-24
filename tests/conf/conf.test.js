const { LiteSpeedConf } = require('../../index');

const config = ``;

const litespeed = new LiteSpeedConf(config);

describe('Conf', () => {
  test('add node', () => {
    litespeed.conf.add('key', 'value');
    expect(litespeed.tree.get('key').value).toBe('value');
    litespeed.conf.add('foo', 'bar', {
      baz: 'qux',
    });
    expect(litespeed.tree.get('foo').children).toHaveLength(1);
  });

  test('set node value', () => {
    litespeed.conf.add('rewrite', '', {
      foo: 'bar',
      qux: {
        baz: 'perpendicular',
        teaching: {
          meme: 'multiple',
        },
      },
    });

    litespeed.conf.get('rewrite').get('foo').set('halo');
    expect(litespeed.conf.get('rewrite').get('foo').getValue()).toBe('halo');

    litespeed.conf.get('rewrite').get('qux').get('baz').set('something_else');
    expect(litespeed.conf.get('rewrite').get('qux').get('baz').getValue()).toBe(
      'something_else'
    );
  });

  test('remove node', () => {
    litespeed.conf.remove('key', 'value');
    expect(litespeed.conf.get('key')).toBe(null);

    litespeed.conf.remove('key', 'value');
    expect(litespeed.conf.get('foo').node.children).toHaveLength(1);

    litespeed.conf.remove('foo');
    expect(litespeed.conf.get('foo')).toBe(null);

    litespeed.conf.add('context', '/wus-wus', {
      foo: 'bar',
      qux: {
        baz: 'perpendicular',
        teaching: {
          meme: 'multiple',
        },
      },
    });

    litespeed.conf.get('context', '/wus-wus').remove('qux');
    expect(litespeed.conf.get('context', '/wus-wus').get('qux')).toBe(null);
    expect(
      litespeed.conf.get('context', '/wus-wus').get('foo').getValue()
    ).toBe('bar');

    litespeed.conf.get('context', '/wus-wus').remove();
    expect(litespeed.conf.get('context', '/wus-wus')).toBe(null);

    // removing specific key-value
    litespeed.conf.add('foo', 'bar');
    litespeed.conf.add('foo', 'baz');
    litespeed.conf.add('foo', 'qux');
    litespeed.conf.get('foo', 'baz').remove();
    expect(litespeed.conf.get('foo', 'baz')).toBe(null);
    litespeed.conf.get('foo', 'qux').remove();
    expect(litespeed.conf.get('foo', 'qux')).toBe(null);
    litespeed.conf.get('foo', 'bar').remove();
    expect(litespeed.conf.get('foo', 'bar')).toBe(null);
  });

  test('toString', () => {
    console.log(litespeed.toString());
  });
});
