# litespeed-conf

Module for interacting with LiteSpeed config.

```bash
npm install litespeed-conf
```

## Usage

```javascript
const { LiteSpeedConf } = require('litespeed-conf');

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

const litespeed = new LiteSpeedConf(config);

litespeed.conf.add('context', '/baz', {
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

console.log(litespeed.toString());
```

It will output:

```

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
context /foo {
  location $DOC_ROOT/foo/prod
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
}
context /baz {
  location $DOC_ROOT/baz/prod
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
  phpIniOverride {}
  nested {
   foo baz
  }
}
```

Yes that newline in the first line is a bug. I'll fix it, maybe.

## Add node

### Add key value pair

```javascript
litespeed.conf.add('foo', 'bar');
```

This new line will be added in the config string:

```
foo bar
```

### Add new block

```javascript
litespeed.conf.add('context', '/foo', {
  rewrite: {
    enable: 1,
  },
  phpIniOverride: {},
});
```

This new block will be added in the config string:

```
context /foo {
  rewrite {
    enable 1
  }
  phpIniOverride {}
}
```

## Set node value

You can set the value of a node by using `set`.

Config:

```
context /foo {
  rewrite {
    enable 1
  }
  phpIniOverride {}
}
```

We can set the inner `enable` by writing:

```javascript
litespeed.conf.get('context').get('rewrite').get('enable').set('0');
```

The config will look like this:

```
context /foo {
  rewrite {
    enable 0
  }
  phpIniOverride {}
}
```

## Remove node

Config:

```
context /foo {
  rewrite {
    enable 1
  }
  phpIniOverride {}
}
```

```javascript
litespeed.conf.get('context').remove('phpIniOverride');
```

Output:

```
context /foo {
  rewrite {
    enable 1
  }
}
```

You can remove the referenced node by:

```javascript
litespeed.conf.get('context').get('rewrite').remove();
```

This will remove `rewrite` inside context.
