const { ParseTreeNode } = require('../parser');
const { isObject, isNullOrUndefined } = require('../utils');

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
    if (!this.node.isRoot) {
      this.node.value = value;
    }
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
    if (isNullOrUndefined(key) && isNullOrUndefined(value)) {
      this.node.parent?.remove(this.node.key, this.node.value);
      return this;
    }

    this.node.remove(key, value);
    return this;
  }
}

module.exports = Conf;
