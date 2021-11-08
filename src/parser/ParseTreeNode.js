const { NodeIdentifiers } = require('./constants');

class ParseTreeNode {
  constructor(key, value, parent, children = [], isRoot = false) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = children;
    this.isBlock = !!children.length;
    this.isRoot = isRoot;
  }

  get(key, value) {
    let nodeFound = null;
    this.traverse(this, 'dfs', (node) => {
      if (key == NodeIdentifiers.ROOT) {
        if (this.isRoot) {
          nodeFound = this;
          return false;
        } else if (node.isRoot == true) {
          nodeFound = node;
          return false;
        }
        return true;
      }

      if (node.key == key && (value ? value == node.value : true)) {
        nodeFound = node;
        return false;
      }
      return true;
    });
    return nodeFound;
  }

  remove(key, value) {
    this.traverse(this, 'dfs', (node) => {
      if (node.key == key && (value ? value == node.value : true)) {
        const nodeIndex = node.parent.children.findIndex(
          (node) => node.key == key && (value ? value == node.value : true)
        );
        if (nodeIndex > -1) {
          node.parent.children.splice(nodeIndex, 1);
        }
        return false;
      }
      return true;
    });
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
    child.isRoot = false;
    this.isBlock = true && !this.isRoot;
    return child;
  }

  traverseBfs(root, cb) {
    const queue = [{ node: root || this, depth: 0 }];
    let n;

    while (queue.length > 0) {
      n = queue.shift();
      const cbRet = cb(n.node, n.depth);
      if (cbRet === false) {
        return;
      }

      if (!n.node.children) {
        continue;
      }

      for (let i = 0; i < n.node.children.length; i++) {
        queue.push({ node: n.node.children[i], depth: n.depth + 1 });
      }
    }
  }

  traverseDfs(root, cb) {
    const stack = [{ node: root || this, depth: 0 }];
    let n;

    while (stack.length > 0) {
      n = stack.pop();
      const cbRet = cb(n.node, n.depth);
      if (cbRet === false) {
        return;
      }

      if (!n.node.children) {
        continue;
      }

      for (var i = n.node.children.length - 1; i >= 0; i--) {
        stack.push({ node: n.node.children[i], depth: n.depth + 1 });
      }
    }
  }

  traverse(root = null, method = 'bfs', cb) {
    if (method == 'bfs') {
      return this.traverseBfs(root, cb);
    } else if (method == 'dfs') {
      return this.traverseDfs(root, cb);
    }
    throw new Error(`Invalid method ${method}.`);
  }

  toString() {
    let str = '';
    const blockStack = [];
    let lastDepth = -1;
    let pad = '';
    this.traverse(undefined, 'dfs', (node, depth) => {
      pad = depth > 0 ? ' '.repeat(depth) : '';
      if (lastDepth != -1 && depth < lastDepth) {
        blockStack.pop();
        str += '\n';
        str += pad + '}';
      }
      lastDepth = depth;
      let currentBlock = blockStack[blockStack.length - 1];
      if (currentBlock) {
        currentBlock.currentLine++;
      }
      if (!node.isRoot) {
        str += '\n';
      }
      str += pad + `${node.key} ${node.value}`;
      if (node.isBlock) {
        blockStack.push({ totalLines: node.children.length, currentLine: 0 });
        str += ' {';
        if (!node.children.length) {
          str += '}';
          blockStack.pop();
        }
      }
    });
    if (blockStack.length) {
      // close the last block
      str += '\n' + pad.slice(0, pad.length - 1) + '}';
    }
    return str;
  }
}

module.exports = ParseTreeNode;
