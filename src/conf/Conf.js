const { ParseTreeNode } = require('../parser');
const { isObject } = require('../utils');

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

module.exports = Conf;
