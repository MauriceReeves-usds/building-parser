/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

/**
 * Tokenizer spec. This have to run from the most specific to the least specific
 * when trying out different values. For example, a more specific number spec
 * needed to come first before the more general one that matches integers.
 */
const Spec : Array<[RegExp, string]> = [
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
  [/^\./, '.'],
  [/^\[/, '['],
  [/^\]/, ']'],

  // ---------------------------------
  // KEYWORDS
  [/^\blet\b/, 'let'],
  [/^\bif\b/, 'if'],
  [/^\belse\b/, 'else'],
  [/^\btrue\b/, 'true'],
  [/^\bfalse\b/, 'false'],
  [/^\bnull\b/, 'null'],
  [/^\bwhile\b/, 'while'],
  [/^\bdo\b/, 'do'],
  [/^\bfor\b/, 'for'],
  [/^\bdef\b/, 'def'],
  [/^\breturn\b/, 'return'],
  [/^\bclass\b/, 'class'],
  [/^\bextends\b/, 'extends'],
  [/^\bsuper\b/, 'super'],
  [/^\bnew\b/, 'new'],
  [/^\bthis\b/, 'this'],

  // ---------------------------------
  // NUMBERS
  [/^\d+\.+\d+/, 'NUMBER'],
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
  [/^[*/+-]=/, 'COMPLEX_ASSIGN'],

  // ---------------------------------
  // MATH OPERATORS: +, -, *, /
  [/^[+-]/, 'ADDITIVE_OPERATOR'],
  [/^[*/]/, 'MULTIPLICATIVE_OPERATOR'],

  // ---------------------------------
  // LOGICAL OPERATORS: &&, ||
  [/^&&/, 'LOGICAL_AND'],
  [/^\|\|/, 'LOGICAL_OR'],
  [/^!/, 'LOGICAL_NOT'],

  // ---------------------------------
  // RELATIONAL OPERATORS: >, >=, <, <=
  [/^[><]=?/, 'RELATIONAL_OPERATOR'],

  // ---------------------------------
  // STRINGS
  [/^"[^"]*"/, 'STRING'],
  [/^'[^']*'/, 'STRING'],
];

/**
 * Token interface
 */
interface Token {
  type: string,
  value: string
}

/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a stream
 */
export default class Tokenizer {

  private string: string;
  private cursor: number;

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
  isEOF(): boolean {
    return this.cursor === this.string.length;
  }

  /**
     * Whether we still have more tokens
     */
  hasMoreTokens(): boolean {
    return this.cursor < this.string.length;
  }

  /**
     * Obtains next token
     */
  getNextToken(): Token {
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
