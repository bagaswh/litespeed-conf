const { LiteSpeedConfigParser } = require('./src/parser');
const conf = require('./src/conf');

module.exports = {
  LiteSpeedConfigParser,
  LiteSpeedConf: conf.LiteSpeedConf,
  Conf: conf.Conf,
};
