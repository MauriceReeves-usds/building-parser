/**
 * Letter parser
 */
const {Tokenizer} = require('./Tokenizer');

class Parser {
    /**
     * Initialize the parser
     */
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    /**
     * Parses a string into an AST
     * @param {*} string 
     */
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        // prime the tokenizer to obtain the first
        // token which is our lookahead. The lookahead is
        // used for predictive parsing
        this._lookahead = this._tokenizer.getNextToken();

        // parse recursively staring from the main
        // entry point
        return this.Program();
    }

    /**
     * Main entry point
     * 
     * Program
     *  : StatementList
     *  ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.StatementList()
        }; 
    }

    /**
     * StatementList
     *  : Statement
     *  | StatementList Statement -> Statement Statement Statement Statement
     *  ;
     */
    StatementList() {
        const statementList = [this.Statement()];

        while (this._lookahead != null) {
            statementList.push(this.Statement());
        }

        return statementList;
    }

    /**
     * Statement
     *  : ExpressionStatement
     *  ;
     */
    Statement() {
        return this.ExpressionStatement();
    }

    /**
     * ExpressionStatement
     *  : Expression ';'
     *  ;
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';');
        return {
            type: 'ExpressionStatement', expression
        }
    }

    /**
     * Expression
     *  : Literal
     *  ;
     */
    Expression() {
        return this.Literal();
    }

    /**
     * Literal
     *  : NumericLiteral
     *  | StringLiteral
     *  ;
     */
    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
        }
        throw new SyntaxError(`Literal: unexpected literal production`);
    }

    /**
     * StringLiteral
     *  : STRING
     *  ;
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1)
        };
    }

    /**
     * NumericLiteral
     *  : NUMBER
     *  ;
     */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value)
        };
    }

    /**
     * Expects a token of a given type
     * @param {*} tokenType 
     * @returns 
     */
    _eat(tokenType) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}"`
            );
        }

        // advance to the next token
        this._lookahead = this._tokenizer.getNextToken();

        // return token
        return token;
    }
};

module.exports = { Parser }
