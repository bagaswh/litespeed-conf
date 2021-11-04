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
    this.tree = new ParseTreeNode("", "", null);
    this.context = new ParseTreeNode("", "", this.tree);

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

    switch (c) {
      case "{":
      case "\n":
      case "\r": {
        const keyTrimmed = this.context.key.trim();
        const valueTrimmed = this.context.value.trim();
        if (!keyTrimmed.length && !valueTrimmed.length) {
          this.index++;
          return;
        }

        this.context.key = keyTrimmed;
        this.context.value = valueTrimmed;

        this.context.parent.addChild(this.context);

        if (c == "{") {
          this.context.isBlock = true;
        }

        this.context = new ParseTreeNode(
          "",
          "",
          this.context.isBlock ? this.context : this.context.parent
        );
        break;
      }
      case "}":
        this.context = new ParseTreeNode("", "", this.context.parent.parent);
        break;
      default: {
        const word = this.readWord();
        if (word !== null) {
          if (!this.context.key) {
            this.context.key = word.trim();
          } else {
            this.context.value += word;
          }
        } else {
          this.index++;
        }
        return;
      }
    }
    this.index++;
  }

  readWord() {
    const substring = this.source.substring(this.index);
    if (!substring.trim().length) {
      this.index += substring.length;
    }
    let result = /^(.+?)[\s;{}'"]/.exec(this.source.substring(this.index));
    if (!result) {
      throw this.createError("Invalid line.");
    }
    let word = result[1];
    this.index += word.length;
    if (word[word.length - 1] == "`") {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const c = this.source[this.index];
        word += c;
        if (c == "`") {
          this.index++;
          break;
        }
        if (this.index == this.source.length - 1) {
          throw this.createError("Unterminated literal block.");
        }
        this.index++;
      }
    }
    return word;
  }
}

module.exports = { LiteSpeedConfigParser, ParseTreeNode, ParserError };
