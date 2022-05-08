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

    // ---------------------------------
    // NUMBERS
    [/^\d+/, 'NUMBER'],
    
    // ---------------------------------
    // IDENTIFIERS
    [/^\w+/, 'IDENTIFIER'],

    // ---------------------------------
    // ASSIGNMENT OPERATORS: =, *=, /=, +=, -=
    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

    // ---------------------------------
    // MATH OPERATORS: +, -, *, /
    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
    [/^[\*\/]/, 'MULTIPLICATIVE_OPERATOR'],

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
        this._string = string;
        this._cursor = 0;
    }

    /**
     * Shows we're at the end of the string
     * @returns 
     */
    isEOF() {
        return this._cursor === this._string.length;
    }

    /**
     * Whether we still have more tokens
     */
    hasMoreTokens() {
        return this._cursor < this._string.length
    }

    /**
     * Obtains next token
     */
    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);

        // loop through the spec and see if anything matches
        // if it doesn't, throw an unexpected token type error
        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);

            // try next token
            if (tokenValue == null)
                continue;

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
    _match(regexp, string) {
        const matched = regexp.exec(string);
        if (matched == null) {
            return null;
        }

        this._cursor += matched[0].length;
        return matched[0];
    }
};

module.exports = {
    Tokenizer,
}