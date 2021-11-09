module.exports.config1 = `docRoot                   $VH_ROOT/client
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

  phpIniOverride  {}
}

context /lgi {
  location                $DOC_ROOT/lgi/prod
  allowBrowse             1

  rewrite  {
   enable                1
  }
  addDefaultCharset       off

  phpIniOverride  {}
}

rewrite  {
  enable                  1
  autoLoadHtaccess        1
}`;
