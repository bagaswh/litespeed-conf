# litespeed-conf

Module for interacting with LiteSpeed config.

```bash
npm install litespeed-conf
```

## Usage

```javascript
const { LiteSpeedConf } = require('litespeed-conf');

const config = `httpdWorkers 1
user nobody
group nobody
priority 0
cpuAffinity 2

errorlog $SERVER_ROOT/logs/error.log {
    logLevel DEBUG
}

module mod_security {
    modsecurity on|off
    modsecurity_rules \`
        SecRuleEngine On
        SecRule ARGS "@streq whee" "id:10,phase:2"
        SecRule ARGS "@streq whee" "id:11,phase:2"
    \`
}`;

const liteSpeedConf = new LiteSpeedConf(config);

liteSpeedConf.conf.add('rewrite', '', {
  foo: 'bar',
});

console.log(liteSpeedConf.toString());
```

It will output:

```
 httpdWorkers 1
 user nobody
 group nobody
 priority 0
 cpuAffinity 2
 errorlog $SERVER_ROOT/logs/error.log {
  logLevel DEBUG
 }
 module mod_security {
  modsecurity on|off
  modsecurity_rules `
        SecRuleEngine On
        SecRule ARGS "@streq whee" "id:10,phase:2"
        SecRule ARGS "@streq whee" "id:11,phase:2"
    `
 }
 rewrite  {
  foo bar
 }
```
