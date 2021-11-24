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
  logFormat "%v%h%l%u%t\"%r\"%>s%b%D%T"
  rollingSize 10M
  keepDays 30
  compressArchive 1
}
context /sosro {
  location /var/www/client/sosro/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /image {
  location /var/www/client/image/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /prosehat {
  location /var/www/client/prosehat/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /seawiz {
  location /var/www/client/seawiz/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /corona {
  location /var/www/client/corona/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /lgi {
  location /var/www/client/lgi/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /jabartel {
  location /var/www/client/jabartel/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /xl {
  location /var/www/client/xl/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /korlantas {
  location /var/www/client/korlantas/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /botika {
  location /var/www/client/botika/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /maybank {
  location /var/www/client/maybank/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /ahm {
  location /var/www/client/ahm/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /botika-packet {
  location /var/www/client/botika-packet/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /docs {
  location /var/www/client/docs/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /sampoerna {
  location /var/www/client/sampoerna/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /okky-jelly {
  location /var/www/client/okky-jelly/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /identik {
  location /var/www/client/identik/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /mailbox {
  location /var/www/client/mailbox/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /kemenag {
  location /var/www/client/kemenag/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /console-botika {
  location /var/www/client/console-botika/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /botika_project_smartcity {
  location /var/www/client/botika_project_smartcity/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /api-mshop {
  location /var/www/client/api-mshop/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /bukopinvica {
  location /var/www/client/bukopinvica/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /sharp {
  location /var/www/client/sharp/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /eliza {
  location /var/www/client/eliza/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /sealand {
  location /var/www/client/sealand/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /pulse {
  location /var/www/client/pulse/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /sxsw {
  location /var/www/client/sxsw/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /botikaadmin {
  location /var/www/client/botikaadmin/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /blastika {
  location /var/www/client/blastika/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /valet {
  location /var/www/client/valet/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /videocall {
  location /var/www/client/videocall/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /vospay {
  location /var/www/client/vospay/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /mediacare {
  location /var/www/client/mediacare/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /sulselbar {
  location /var/www/client/sulselbar/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /unaids {
  location /var/www/client/unaids/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /ap2 {
  location /var/www/client/ap2/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /ppob-pulsa {
  location /var/www/client/ppob-pulsa/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /pertamedika {
  location /var/www/client/pertamedika/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /elsheskin {
  location /var/www/client/elsheskin/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /iconplus {
  location /var/www/client/iconplus/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /api_lmd {
  location /var/www/client/api_lmd/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /spelling {
  location /var/www/client/spelling/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /knowledgebase {
  location /var/www/client/knowledgebase/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /check_script {
  location /var/www/client/check_script/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /botQA {
  location /var/www/client/botQA/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /beacukai {
  location /var/www/client/beacukai/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /toyota {
  location /var/www/client/toyota/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /smm {
  location /var/www/client/smm/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /mizone {
  location /var/www/client/mizone/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /soscom {
  location /var/www/client/soscom/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /tiket {
  location /var/www/client/tiket/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /bank-indonesia {
  location /var/www/client/bank-indonesia/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /smartcity {
  location /var/www/client/smartcity/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /narrative-report {
  location /var/www/client/narrative-report/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /botika-test {
  location /var/www/client/botika-test/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /megaautocentralfinance {
  location /var/www/client/megaautocentralfinance/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /bi {
  location /var/www/client/bi/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /brins {
  location /var/www/client/brins/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /cms {
  location /var/www/client/cms/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /firstmedia {
  location /var/www/client/firstmedia/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /fact-check.bak {
  location /var/www/client/fact-check.bak/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /nasdem {
  location /var/www/client/nasdem/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /tmp {
  location /var/www/client/tmp/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /mshop {
  location /var/www/client/mshop/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /web-pao {
  location /var/www/client/web-pao/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /dbo {
  location /var/www/client/dbo/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /rs-botika {
  location /var/www/client/rs-botika/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /umkm {
  location /var/www/client/umkm/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /combi {
  location /var/www/client/combi/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /relay {
  location /var/www/client/relay/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /ppob-pesawat {
  location /var/www/client/ppob-pesawat/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /shortcut-botika {
  location /var/www/client/shortcut-botika/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /aqua {
  location /var/www/client/aqua/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /bankbi {
  location /var/www/client/bankbi/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /samantha {
  location /var/www/client/samantha/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /lmd {
  location /var/www/client/lmd/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /legalgo {
  location /var/www/client/legalgo/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /ekorpri {
  location /var/www/client/ekorpri/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /itemku {
  location /var/www/client/itemku/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /sismedika {
  location /var/www/client/sismedika/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /litebig {
  location /var/www/client/litebig/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /sdli {
  location /var/www/client/sdli/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /seabot-dashboard {
  location /var/www/client/seabot-dashboard/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /mcc {
  location /var/www/client/mcc/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /agrodana {
  location /var/www/client/agrodana/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /garuda-api {
  location /var/www/client/garuda-api/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /rs-botika2 {
  location /var/www/client/rs-botika2/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /seabot {
  location /var/www/client/seabot/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /haier {
  location /var/www/client/haier/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /liputan6 {
  location /var/www/client/liputan6/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /seabot-stt {
  location /var/www/client/seabot-stt/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /andripgbyk {
  location /var/www/client/andripgbyk/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /roomme {
  location /var/www/client/roomme/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /haier-survey {
  location /var/www/client/haier-survey/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /elephant {
  location /var/www/client/elephant/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /fact-check {
  location /var/www/client/fact-check/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /olshopai/webstore {
  location /var/www/html/olshopai/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
context /landing {
  location /var/www/lsws_vhosts/main/html/Botika/botika.online/prod/
  allowBrowse 1
  rewrite {
   enable 1
  }
  addDefaultCharset off
}
`;

const litespeed = new LiteSpeedConf(config);

litespeed.conf.get('context', '/landing').remove();
console.log(litespeed.toString());
