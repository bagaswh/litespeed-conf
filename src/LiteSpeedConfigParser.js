class ParserError extends Error {
  constructor(message, args) {
    super(message);

    this.line = args.line;
    this.index = args.index;
  }
}

class ParseTreeNode {
  constructor(key, value, parent, children = []) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = children;
    this.isBlock = !!children.length;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }

  walk(root = null, cb) {
    if (!this.children.length) {
      return;
    }
    const children = (root ? root.children : this.children) || [];
    for (const child of children) {
      cb(child);
      this.walk(child, cb);
    }
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
    this.tree = new ParseTreeNode('', '', null);
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

module.exports = { LiteSpeedConfigParser, ParseTreeNode, ParserError };
