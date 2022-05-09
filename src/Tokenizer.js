/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/**
 * Tokenizer spec
 */
const Spec = [
  // ---------------------------------
  // WHITESPACE
  [/^\s+/, null],

  // ---------------------------------
  // COMMENTS
  // single line comments
  [/^\/\/.*/, null],
  // multiline comments
  [/^\/\*[\s\S]*?\*\//, null],

  // ---------------------------------
  // SYMBOLS, DELIMITERS
  [/^;/, ';'],
  [/^\{/, '{'],
  [/^\}/, '}'],
  [/^\(/, '('],
  [/^\)/, ')'],
  [/^,/, ','],

  // ---------------------------------
  // KEYWORDS
  [/^\blet\b/, 'let'],
  [/^\bif\b/, 'if'],
  [/^\belse\b/, 'else'],
  [/^\btrue\b/, 'true'],
  [/^\bfalse\b/, 'false'],
  [/^\bnull\b/, 'null'],

  // ---------------------------------
  // NUMBERS
  [/^\d+/, 'NUMBER'],

  // ---------------------------------
  // IDENTIFIERS
  [/^\w+/, 'IDENTIFIER'],

  // ---------------------------------
  // EQUALITY OPERATORS: ==, !=
  [/^[=!]=/, 'EQUALITY_OPERATOR'],

  // ---------------------------------
  // ASSIGNMENT OPERATORS: =, *=, /=, +=, -=
  [/^=/, 'SIMPLE_ASSIGN'],
  [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

  // ---------------------------------
  // MATH OPERATORS: +, -, *, /
  [/^[+\-]/, 'ADDITIVE_OPERATOR'],
  [/^[\*\/]/, 'MULTIPLICATIVE_OPERATOR'],

  // ---------------------------------
  // LOGICAL OPERATORS: &&, ||
  [/^&&/, 'LOGICAL_AND'],
  [/^\|\|/, 'LOGICAL_OR'],

  // ---------------------------------
  // RELATIONAL OPERATORS: >, >=, <, <=
  [/^[><]=?/, 'RELATIONAL_OPERATOR'],

  // ---------------------------------
  // STRINGS
  [/^"[^"]*"/, 'STRING'],
  [/^'[^']*'/, 'STRING'],
];

/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a stream
 */
class Tokenizer {
  /**
     * Initializes the string
     * @param {*} string
     */
  init(string) {
    this.string = string;
    this.cursor = 0;
  }

  /**
     * Shows we're at the end of the string
     * @returns
     */
  isEOF() {
    return this.cursor === this.string.length;
  }

  /**
     * Whether we still have more tokens
     */
  hasMoreTokens() {
    return this.cursor < this.string.length;
  }

  /**
     * Obtains next token
     */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this.string.slice(this.cursor);

    // loop through the spec and see if anything matches
    // if it doesn't, throw an unexpected token type error
    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this.match(regexp, string);

      // try next token
      if (tokenValue == null) { continue; }

      // a recognizable token but one we don't need
      // to handle because it's something like
      // whitespace
      if (tokenType == null) {
        return this.getNextToken();
      }

      return { type: tokenType, value: tokenValue };
    }

    throw new SyntaxError(`Unexpected token "${string}"`);
  }

  /**
     * Matches or returns null
     * @param {*} regexp
     * @param {*} string
     * @returns
     */
  match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return null;
    }

    this.cursor += matched[0].length;
    return matched[0];
  }
}

module.exports = {
  Tokenizer,
};
