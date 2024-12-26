const { LiteSpeedConfigParser, LiteSpeedConf } = require('../..');
const { config1 } = require('../common');

const tree = new LiteSpeedConfigParser(config1).parse();

describe('ParseTreeNode', () => {
  test('should traverse at only specified max depth', () => {
    const maxDepth = 1;
    tree.traverse(null, { maxDepth, method: 'dfs' }, (node, depth) => {
      expect(depth).toBeLessThanOrEqual(maxDepth);
    });
  });

  test('should retrieve the first item with key', () => {
    const node = tree.get('context');
    expect(node.key).toBe('context');
    expect(node.value).toBe('/bank-indonesia');
  });

  test('should remove node', () => {
    let node = tree.get('context', '/bank-indonesia');
    expect(node.key).toBe('context');
    expect(node.value).toBe('/bank-indonesia');
    tree.remove('context', '/bank-indonesia');
    node = tree.get('context', '/bank-indonesia');
    expect(node).toBe(null);
  });

  test('to string', () => {
    expect(tree.toString()).toBe(
      `
serverName
docRoot $VH_ROOT/client
errorlog /var/log/lsws/vhost_main/error.log {
  useServer 0
  logLevel ERROR
  rollingSize 10M
  keepDays 30
  compressArchive 1
}
accesslog /var/log/lsws/vhost_main/access.log {
  useServer 0
  rollingSize 10M
  keepDays 30
  compressArchive 1
}
context /lgi {
  location $DOC_ROOT/lgi/prod
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
  phpIniOverride {}
}
rewrite {
  enable 1
  autoLoadHtaccess 1
}`
    );
  });
});

describe('Parser', () => {
  test('multiline value', () => {
    const conf = `rewrite  {
  enable                  1
  autoLoadHtaccess        1
  rules                   <<<END_rules
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteCond %{HTTP:X-Forwarded-Proto} =http
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

<IfModule LiteSpeed>
ForceSecureCookie secure same_site_none
CacheEngine on
CacheLookup public on
</IfModule>
  END_rules
}
`;
    const litespeed = new LiteSpeedConf(conf);
    expect(litespeed.conf.get('rewrite').get('rules').getValue()).toBe(
      `<<<END_rules
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteCond %{HTTP:X-Forwarded-Proto} =http
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

<IfModule LiteSpeed>
ForceSecureCookie secure same_site_none
CacheEngine on
CacheLookup public on
</IfModule>
  END_rules`
    );
  });
});
