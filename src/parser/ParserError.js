class ParserError extends Error {
  constructor(message, args) {
    super(message);

    this.line = args.line;
    this.index = args.index;
  }
}

module.exports = ParserError;
