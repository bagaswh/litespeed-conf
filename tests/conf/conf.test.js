const { LiteSpeedConf } = require('../../index');

const config = ``;

const liteSpeedConf = new LiteSpeedConf(config);

describe('Conf', () => {
  test('add node', () => {
    liteSpeedConf.conf.add('key', 'value');
    expect(liteSpeedConf.tree.get('key').value).toBe('value');
    liteSpeedConf.conf.add('foo', 'bar', {
      baz: 'qux',
    });
    expect(liteSpeedConf.tree.get('foo').children).toHaveLength(1);
  });

  test('set node value', () => {
    liteSpeedConf.conf.add('rewrite', '', {
      foo: 'bar',
      qux: {
        baz: 'perpendicular',
        teaching: {
          meme: 'multiple',
        },
      },
    });

    liteSpeedConf.conf.get('rewrite').get('foo').set('halo');
    expect(liteSpeedConf.conf.get('rewrite').get('foo').getValue()).toBe(
      'halo'
    );

    liteSpeedConf.conf
      .get('rewrite')
      .get('qux')
      .get('baz')
      .set('something_else');
    expect(
      liteSpeedConf.conf.get('rewrite').get('qux').get('baz').getValue()
    ).toBe('something_else');
  });

  test('remove node', () => {
    liteSpeedConf.conf.remove('key', 'value');
    expect(liteSpeedConf.conf.get('key')).toBe(null);

    liteSpeedConf.conf.remove('key', 'value');
    expect(liteSpeedConf.conf.get('foo').node.children).toHaveLength(1);

    liteSpeedConf.conf.remove('foo');
    expect(liteSpeedConf.conf.get('foo')).toBe(null);

    liteSpeedConf.conf.add('context', '/wus-wus', {
      foo: 'bar',
      qux: {
        baz: 'perpendicular',
        teaching: {
          meme: 'multiple',
        },
      },
    });

    liteSpeedConf.conf.get('context', '/wus-wus').remove('qux');
    expect(liteSpeedConf.conf.get('context', '/wus-wus').get('qux')).toBe(null);
    expect(
      liteSpeedConf.conf.get('context', '/wus-wus').get('foo').getValue()
    ).toBe('bar');

    liteSpeedConf.conf.get('context', '/wus-wus').remove();
    expect(liteSpeedConf.conf.get('context', '/wus-wus')).toBe(null);
  });

  test('toString', () => {
    console.log(liteSpeedConf.toString());
  });
});
