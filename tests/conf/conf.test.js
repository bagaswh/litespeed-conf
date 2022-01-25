const { LiteSpeedConf } = require('../../index');

describe('conf', () => {
  describe('add', () => {
    const litespeed = new LiteSpeedConf('');

    test('add node with simple key-value', () => {
      litespeed.conf.add('key', 'value');
      expect(litespeed.tree.get('key').value).toBe('value');
    });

    test('add node with object value', () => {
      litespeed.conf.add('multi-child', '', {
        foo: 'bar',
      });
      expect(litespeed.tree.get('multi-child').get('foo').value).toBe('bar');
    });

    test('add node with value containing whitespace', () => {
      litespeed.conf.add('value-whitespaced', '/', {
        extraHeaders: 'Header set X-Frame-Options: DENY',
      });
      expect(
        litespeed.tree.get('value-whitespaced').get('extraHeaders').value
      ).toBe('Header set X-Frame-Options: DENY');
    });
  });

  describe('set node value', () => {
    test('set node value', () => {
      const litespeed = new LiteSpeedConf(`
      rewrite {
        foo bar
        qux {
          baz perpendicular
          teaching {
            meme multiple
          }
        }
      }`);

      litespeed.conf.get('rewrite').get('foo').set('halo');
      expect(litespeed.conf.get('rewrite').get('foo').getValue()).toBe('halo');

      litespeed.conf.get('rewrite').get('qux').get('baz').set('something_else');
      expect(
        litespeed.conf.get('rewrite').get('qux').get('baz').getValue()
      ).toBe('something_else');
    });
  });

  describe('remove node', () => {
    test('remove node', () => {
      const litespeed = new LiteSpeedConf(`
      key value
      foo {
        bar baz
      }
      `);
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
  });
});
