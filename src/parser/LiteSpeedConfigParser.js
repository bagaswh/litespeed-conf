const ParserError = require('./ParserError');
const ParseTreeNode = require('./ParseTreeNode');
const { toArray } = require('../utils');

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
      if (!this.context.key) {
        const word = this.readWord({ ignoreWhiteSpace: false });
        if (!word.length) {
          return;
        }
        this.context.key = word;
      } else {
        const word = this.readWord({ ignoreWhiteSpace: true });
        if (!word.length) {
          return;
        }
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

  readWord(opts = { ignoreWhiteSpace: false }) {
    let word = '';
    const terminationTokens = [' ', '`', '{', '}', '\n', '\r'];
    word += this.readUntil(
      terminationTokens.slice(opts.ignoreWhiteSpace ? 1 : 0)
    );

    let endRulesMultilineValue = '';
    if (word.trim().match(/<<<END_rules/)) {
      // read until END_rules
      while (!endRulesMultilineValue.match(/END_rules/)) {
        endRulesMultilineValue += this.source[this.index];
        this.index++;
      }
      word += endRulesMultilineValue;
    }

    const last = word[word.length - 1];
    if (terminationTokens.slice(2).includes(last)) {
      word = word.slice(0, word.length - 1);
      this.index--;
    }
    // literal block '`'
    if (word[word.length - 1] == '`') {
      word += this.readUntil('`');
    }
    return word.trim();
  }

  readUntil(terminationChars) {
    terminationChars = toArray(terminationChars);
    let str = '';
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

module.exports = LiteSpeedConfigParser;
