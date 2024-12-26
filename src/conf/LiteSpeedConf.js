const { LiteSpeedConfigParser } = require('../parser');
const Conf = require('./Conf');

class LiteSpeedConf {
  constructor(config) {
    this.config = config;
    this.tree = null;
    this.parse();
    this.conf = new Conf(this.tree);
  }

  parse() {
    this.tree = new LiteSpeedConfigParser(this.config).parse();
  }

  getConf(key, value) {
    return this.conf.get(key, value);
  }

  toString() {
    return this.tree.toString();
  }
}

module.exports = LiteSpeedConf;
