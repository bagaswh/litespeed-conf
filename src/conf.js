const { LiteSpeedConfigParser, ParseTreeNode } = require('./parser');
const { isObject } = require('./utils');

class Conf {
  constructor(node) {
    this.node = node;
  }

  update(key, value) {
    const node = this.node.get(key);
    node.value = value;
    return this;
  }

  add(key, value, children) {
    const block = this.node.addChild(new ParseTreeNode(key, value, this.node));
    if (isObject(children)) {
      for (const key in children) {
        block.addChild(new ParseTreeNode(key, children[key], this.node));
      }
      return this;
    }
    return this;
  }

  remove(key, value) {
    this.node.remove(key, value);
  }
}

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

module.exports = { LiteSpeedConf };
