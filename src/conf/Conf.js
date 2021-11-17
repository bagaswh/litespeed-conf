const { ParseTreeNode } = require('../parser');
const { isObject } = require('../utils');

class Conf {
  constructor(node) {
    this.node = node;
  }

  getKey() {
    return this.node.key;
  }

  getValue() {
    return this.node.value;
  }

  get(key, value) {
    const node = this.node.get(key, value);
    if (node !== null) {
      return new Conf(node);
    }
    return null;
  }

  set(value) {
    this.node.value = value;
  }

  add(key, value, children, parentNode = null) {
    const node = (parentNode || this.node).addChild(
      new ParseTreeNode(key, value, this.node)
    );
    if (isObject(children)) {
      for (const key in children) {
        if (isObject(children[key])) {
          this.add(key, '', children[key], node);
        } else {
          node.addChild(new ParseTreeNode(key, children[key], this.node));
        }
      }
      node.isBlock = true;
      return this;
    }
    return this;
  }

  remove(key, value) {
    this.node.remove(key, value);
    return this;
  }
}

module.exports = Conf;
