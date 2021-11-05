const NodeIdentifiers = {
  ROOT: Symbol('RootNode'),
};

class ParserError extends Error {
  constructor(message, args) {
    super(message);

    this.line = args.line;
    this.index = args.index;
  }
}

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
  }

  traverseBfs(root, cb) {
    const queue = [{ node: root || this, depth: 0 }];
    let n;

    while (queue.length > 0) {
      n = queue.shift();
      cb(n.node, n.depth);

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
      cb(n.node, n.depth);

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
    let insideBlock = false;
    let insideBlockUntil = 0;
    let blockLinesCount = 0;
    this.traverse(undefined, 'dfs', (node, depth) => {
      if (insideBlock) {
        blockLinesCount++;
      }
      str += (depth > 1 ? ' '.repeat(depth) : '') + `${node.key} ${node.value}`;
      if (node.isBlock) {
        insideBlock = true;
        insideBlockUntil = node.children.length;
        str += ' {';
        str += '\n';
        return;
      }
      if (!node.isBlock && insideBlock && blockLinesCount == insideBlockUntil) {
        insideBlock = false;
        blockLinesCount = 0;
        str += '\n}';
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

class LiteSpeedConfigParser {
  constructor(source) {
    this.source = source;
    this.index = -1;
    this.context = null;
    this.comments = [];
  }

  parse() {
    this.index = 0;
    this.tree = new ParseTreeNode('', '', null, [], true);
    this.context = new ParseTreeNode('', '', this.tree);

    do {
      this.parseNext();
    } while (this.index < this.source.length);

    return this.tree;
  }

  createError(message) {
    const line = this.source.substring(0, this.index).match(/\n/g) || [];

    return new ParserError(message, {
      index: this.index,
      line: line.length + 1,
    });
  }

  parseNext() {
    const c = this.source[this.index];

    if (c == '{' || c == '\n' || c == '\r') {
      this.setContext(c);
    } else if (c == '}') {
      this.context = new ParseTreeNode('', '', this.context.parent.parent);
      this.index++;
    } else {
      const word = this.readWord();
      if (!word.length) {
        return;
      }
      if (!this.context.key) {
        this.context.key = word;
      } else {
        this.context.value += word;
      }
    }

    if (this.index == this.source.length) {
      this.setContext(c);
    }
  }

  setContext(c) {
    const keyTrimmed = this.context.key.trim();
    const valueTrimmed = this.context.value.trim();
    if (!keyTrimmed.length && !valueTrimmed.length) {
      this.index++;
      return;
    }

    this.context.key = keyTrimmed;
    this.context.value = valueTrimmed;

    this.context.parent.addChild(this.context);

    if (c == '{') {
      this.context.isBlock = true;
    }

    if (this.index < this.source.length) {
      this.context = new ParseTreeNode(
        '',
        '',
        this.context.isBlock ? this.context : this.context.parent
      );
    }

    this.index++;
  }

  readWord() {
    let word = '';
    const terminationTokens = ['`', ' ', '{', '}', '\n', '\r'];
    word += this.readUntil(terminationTokens);
    if (!word.trim().length) {
      return this.readWord();
    }
    const last = word[word.length - 1];
    if (terminationTokens.slice(2).includes(last)) {
      word = word.slice(0, word.length - 1);
      this.index--;
    }
    if (word[word.length - 1] == '`') {
      word += this.readUntil('`');
    }
    return word;
  }

  readUntil(terminationChars) {
    terminationChars = toArray(terminationChars);
    let str = '';
    // eslint-disable-next-line no-constant-condition
    while (this.index < this.source.length) {
      const c = this.source[this.index];
      str += c;
      if (terminationChars.includes(c)) {
        this.index++;
        break;
      }
      this.index++;
    }
    return str;
  }
}

function toArray(thing) {
  if (Array.isArray(thing)) {
    return thing;
  }
  return [thing];
}

module.exports = {
  LiteSpeedConfigParser,
  ParseTreeNode,
  ParserError,
  NodeIdentifiers,
};
