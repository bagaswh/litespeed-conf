const { LiteSpeedConf } = require('../index');

const config = `docRoot                   $VH_ROOT/client

errorlog /var/log/lsws/vhost_main/error.log {
  useServer               0
  logLevel                ERROR
  rollingSize             10M
  keepDays                30
  compressArchive         1
}

accesslog /var/log/lsws/vhost_main/access.log {
  useServer               0
  rollingSize             10M
  keepDays                30
  compressArchive         1
}

context /foo {
  location                $DOC_ROOT/foo/prod
  allowBrowse             1

  rewrite  {
    enable                1

  }
  addDefaultCharset       off

  phpIniOverride  {

  }
}

rewrite  {
  enable                  1
  autoLoadHtaccess        1
}
`;

const liteSpeedConf = new LiteSpeedConf(config);

liteSpeedConf.conf.add('context', '/baz', {
  location: '$DOC_ROOT/baz/prod',
  allowBrowse: 1,
  rewrite: {
    enable: 1,
  },
  addDefaultCharset: 'off',
  phpIniOverride: {},
  nested: {
    foo: 'baz',
  },
});

const rewriteConf = liteSpeedConf.getConf('rewrite');
rewriteConf.update({ key: 'enable' }, '0');

console.log(liteSpeedConf.toString());
