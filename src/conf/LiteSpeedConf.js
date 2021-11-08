const { LiteSpeedConfigParser } = require('../parser');
const Conf = require('./Conf');

class LiteSpeedConf {
  constructor(config) {
    this.config = config;
    this.tree = null;
    this.parse();
  }

  parse() {
    this.tree = new LiteSpeedConfigParser(this.config).parse();
  }

  get(key, value) {
    const node = this.tree.get(key, value);
    if (node !== null) {
      return new Conf(node);
    }
    return null;
  }

  toString() {
    return this.tree.toString();
  }
}

module.exports = LiteSpeedConf;
