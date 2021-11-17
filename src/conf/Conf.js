const { ParseTreeNode } = require('../parser');
const { isObject } = require('../utils');

class Conf {
  constructor(node) {
    this.node = node;
  }

  get(key, value) {
    const node = this.node.get(key, value);
    if (node !== null) {
      return new Conf(node);
    }
    return null;
  }

  update(nodeTarget, updatedValue) {
    if (!nodeTarget?.key && this.node.isBlock) {
      throw new Error('This node is a block. Key needs to be specified.');
    }

    if (!nodeTarget?.key && !this.node.isBlock) {
      this.node.value = updatedValue;
      return this;
    }

    const node = this.node.get(nodeTarget.key, nodeTarget.value);
    if (!node) {
      throw new Error('Node not found.');
    }
    node.value = updatedValue;
    return this;
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
