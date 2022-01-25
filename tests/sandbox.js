const { LiteSpeedConf } = require('../index');

const config = `docRoot $VH_ROOT/html/
errorlog /var/log/lsws/vhost_main/error.log {
  useServer 0
  logLevel ERROR
  rollingSize 10M
  keepDays 30
  compressArchive 1
}
accesslog /var/log/lsws/vhost_main/access.log {
  useServer 0
  logFormat "%v %h %l %u %t \"%r\" %>s %b %D %T"
  rollingSize 10M
  keepDays 30
  compressArchive 1
}
context /landing {
  location /var/www/lsws_vhosts/main/html/Botika/botika.online/prod/
  allowBrowse 1
  rewrite {
   enable 1
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
  addDefaultCharset off
}
`;

const litespeed = new LiteSpeedConf(config);

litespeed.tree.traverse(undefined, {}, (node) => {
  console.log(node);
});
