const { LiteSpeedConf } = require('../src/conf');

const config = `httpdWorkers 1
user nobody
group nobody
priority 0
cpuAffinity 2
enableLVE 0
inMemBufSize 60M
swappingDir /tmp/lshttpd/swap
autoFix503 1
gracefulRestartTimeout 300
mime $SERVER_ROOT/conf/mime.properties
showVersionNumber 1
useIpInProxyHeader 0
adminEmails root@localhost

errorlog $SERVER_ROOT/logs/error.log {
    logLevel DEBUG
    debugLevel 10
    rollingSize 10M
    enableStderrLog 1
}

accesslog $SERVER_ROOT/logs/access.log {
    rollingSize 10M
    keepDays 30
    compressArchive 0
}
indexFiles index.html, index.php

expires {
    enableExpires 1
    expiresByType image/*=A604800, text/css=A604800, application/x-javascript=A604800
}
autoLoadHtaccess 1

tuning {
    maxConnections 2000
    maxSSLConnections 1000
    connTimeout 300
    maxKeepAliveReq 1000
    smartKeepAlive 0
    keepAliveTimeout 5
    sndBufSize 0
    rcvBufSize 0
    maxReqURLLen 8192
    maxReqHeaderSize 16380
    maxReqBodySize 2047M
    maxDynRespHeaderSize 8192
    maxDynRespSize 2047M
    maxCachedFileSize 4096
    totalInMemCacheSize 20M
    maxMMapFileSize 256K
    totalMMapCacheSize 40M
    useSendfile 1
    fileETag 28
    enableGzipCompress 1
    compressibleTypes text/*,application/x-javascript,application/javascript,application/xml, image/svg+xml
    enableDynGzipCompress 1
    gzipCompressLevel 6
    gzipAutoUpdateStatic 1
    gzipStaticCompressLevel 6
    gzipMaxFileSize 10M
    gzipMinFileSize 300
}

fileAccessControl {
    followSymbolLink 1
    checkSymbolLink 0
    requiredPermissionMask 000
    restrictedPermissionMask 000
}

perClientConnLimit {
    staticReqPerSec 0
    dynReqPerSec 0
    outBandwidth 0
    inBandwidth 0
    softLimit 10000
    hardLimit 10000
    gracePeriod 15
    banPeriod 300
}

CGIRLimit {
    maxCGIInstances 20
    minUID 11
    minGID 10
    priority 0
    CPUSoftLimit 10
    CPUHardLimit 50
    memSoftLimit 1460M
    memHardLimit 1470M
    procSoftLimit 400
    procHardLimit 450
}

accessDenyDir {
    dir /
    dir /etc/*
    dir /dev/*
    dir $SERVER_ROOT/conf/*
    dir $SERVER_ROOT/admin/conf/*
}

accessControl {
    allow ALL
}

extprocessor lsphp {
    type lsapi
    address uds://tmp/lshttpd/lsphp.sock
    maxConns 35
    env PHP_LSAPI_MAX_REQUESTS=50
    env PHP_LSAPI_CHILDREN=35
    initTimeout 60
    retryTimeout 0
    persistConn 1
    respBuffer 0
    autoStart 2
    path $SERVER_ROOT/fcgi-bin/lsphpnew
    backlog 100
    instances 1
    runOnStartUp 3
    priority 0
    memSoftLimit 2047M
    memHardLimit 2047M
    procSoftLimit 400
    procHardLimit 500
}

scripthandler {
    add lsapi:lsphp php
}

railsDefaults {
    maxConns 5
    env LSAPI_MAX_IDLE=60
    initTimeout 60
    retryTimeout 0
    pcKeepAliveTimeout 60
    respBuffer 0
    backlog 50
    runOnStartUp 1
    extMaxIdleTime 300
    priority 3
    memSoftLimit 2047M
    memHardLimit 2047M
    procSoftLimit 500
    procHardLimit 600
}

module cache {
    # 0
    checkPrivateCache 1
    checkPublicCache 1
    maxCacheObjSize 10000000
    maxStaleAge 200
    qsCache 1
    reqCookieCache 1
    respCookieCache 1
    ignoreReqCacheCtrl 1
    ignoreRespCacheCtrl 0

    enableCache 0
    expireInSeconds 3600
    enablePrivateCache 0
    privateExpireInSeconds 3600

    ls_enabled 1
}

module mod_security {
    modsecurity on|off
    modsecurity_rules \`
        SecRuleEngine On
        SecRule ARGS "@streq whee" "id:10,phase:2"
        SecRule ARGS "@streq whee" "id:11,phase:2"
    \`
    modsecurity_rules_file /rule/file/path
    modsecurity_rules_remote key uri
}

virtualhost Example {
    vhRoot /var/www/html/Example/
    configFile $SERVER_ROOT/conf/vhosts/Example/vhconf.conf
    allowSymbolLink 1
    enableScript 1
    restrained 1
    setUIDMode 0
}

listener Default {
    address *:80
    secure 0
    map Example *
}

listener Defaultssl {
    address *:443
    secure 1
    keyFile /usr/local/lsws/conf/example.key
    certFile /usr/local/lsws/conf/example.crt
    map Example *
}`;

const litespeedConf = new LiteSpeedConf(config);

let conf = litespeedConf.get('listener', 'Defaultssl');
conf.add('foo', 'bar');

conf = litespeedConf.get('listener', 'Default');
conf.add('me', 'and who');

console.log(litespeedConf.toString());
