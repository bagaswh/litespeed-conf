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
    let blockStack = [];
    this.traverse(undefined, 'dfs', (node, depth) => {
      let currentBlock = blockStack[blockStack.length - 1];
      if (currentBlock) {
        currentBlock.currentLine++;
      }
      const pad = depth > 1 ? ' '.repeat(depth) : '';
      str += pad + `${node.key} ${node.value}`;
      if (node.isBlock) {
        blockStack.push({ totalLines: node.children.length, currentLine: 0 });
        str += ' {';
        str += '\n';
        if (!node.children.length) {
          str += '\n';
          str += pad + '}';
          str += '\n';
        }
        return;
      }
      if (
        !node.isBlock &&
        currentBlock &&
        currentBlock.currentLine == currentBlock.totalLines
      ) {
        blockStack.pop();
        str += '\n';
        str += '}';
        str += '\n';
        return;
      }
      if (!node.isRoot) {
        str += '\n';
      }
    });
    return str;
  }
}

module.exports = ParseTreeNode;
