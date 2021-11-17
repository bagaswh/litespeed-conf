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
    this.traverse(this, { method: 'dfs', maxDepth: 1 }, (node) => {
      if (
        node.key.toLowerCase() == key.toLowerCase() &&
        (value ? value == node.value : true)
      ) {
        nodeFound = node;
        return false;
      }
      return true;
    });
    return nodeFound;
  }

  remove(key, value) {
    const node = this.get(key, value);
    if (node) {
      if (node.isRoot) {
        throw new Error('Cannot remove root node.');
      }
      const nodeIndex = node.parent.children.findIndex(
        (child) => child.key == key && (value ? value == node.value : true)
      );
      node.parent.children.splice(nodeIndex, 1);
    }
    return node;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
    child.isRoot = false;
    this.isBlock = true && !this.isRoot;
    return child;
  }

  traverseBfs(root, opts = {}, cb) {
    const queue = [{ node: root || this, depth: 0 }];
    let n;
    const maxDepth = opts.maxDepth || -1;
    while (queue.length > 0) {
      n = queue.shift();
      const cbRet = cb(n.node, n.depth);
      if (cbRet === false) {
        return;
      }
      if (!n.node.children) {
        continue;
      }
      if (maxDepth > -1 && n.depth >= maxDepth) {
        continue;
      }
      for (let i = 0; i < n.node.children.length; i++) {
        queue.push({ node: n.node.children[i], depth: n.depth + 1 });
      }
    }
  }

  traverseDfs(root, opts = {}, cb) {
    const stack = [{ node: root || this, depth: 0 }];
    let n;
    const maxDepth = opts.maxDepth || -1;
    while (stack.length > 0) {
      n = stack.pop();
      const cbRet = cb(n.node, n.depth);
      if (cbRet === false) {
        return;
      }
      if (!n.node.children) {
        continue;
      }
      if (maxDepth > -1 && n.depth >= maxDepth) {
        continue;
      }
      for (var i = n.node.children.length - 1; i >= 0; i--) {
        stack.push({ node: n.node.children[i], depth: n.depth + 1 });
      }
    }
  }

  traverse(root = null, opts = {}, cb) {
    const method = opts.method || 'bfs';
    const maxDepth = opts.maxDepth || -1;
    if (method == 'bfs') {
      return this.traverseBfs(root, { maxDepth }, cb);
    } else if (method == 'dfs') {
      return this.traverseDfs(root, { maxDepth }, cb);
    }
    throw new Error(`Invalid method ${method}.`);
  }

  toString() {
    let str = '';
    let stackLength = 0;
    let lastDepth = -1;
    let pad = '';
    this.traverse(undefined, { method: 'dfs' }, (node, depth) => {
      // handle "node jump"
      let depthDiff = depth < lastDepth ? Math.abs(depth - lastDepth) : 0;
      if (lastDepth != -1 && depthDiff > 0) {
        while (depthDiff--) {
          pad = stackLength > 1 ? ' '.repeat(stackLength) : '';
          stackLength--;
          str += '\n';
          str += pad + '}';
        }
      }

      lastDepth = depth;

      if (!node.isRoot) {
        str += '\n';
      }

      pad = depth > 1 ? ' '.repeat(depth) : '';
      str += pad + node.key + (node.value ? ' ' + node.value : '');
      if (node.isBlock) {
        stackLength++;
        str += ' {';
        if (!node.children.length) {
          str += '}';
          stackLength--;
        }
      }
    });

    // close the last blocks
    while (stackLength > 0) {
      str += '\n';
      pad = stackLength > 1 ? ' '.repeat(stackLength) : '';
      str += pad + '}';
      stackLength--;
    }
    return str;
  }
}

module.exports = ParseTreeNode;
