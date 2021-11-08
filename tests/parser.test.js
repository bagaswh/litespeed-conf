const { LiteSpeedConf } = require('../src/conf');
const { NodeIdentifiers } = require('../src/parser');

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

context /bank-indonesia {
  location                $DOC_ROOT/bank-indonesia/prod
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
}`;

const litespeedConf = new LiteSpeedConf(config);

let conf = litespeedConf.conf;
conf.add('foo', 'bar');
conf.add('me', 'and who');
conf.add('something', 'in the matter', {
  key: 'apa',
  foo: 'bar',
  oke: 'bange',
});
conf.add('nonsens', 'just non sense');

// console.log();
const parsedToString = litespeedConf.toString();
console.log(parsedToString);
