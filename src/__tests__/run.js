/**
 * Main test runner
 */
const {Parser} = require('../Parser');
const {Tokenizer} = require('../Tokenizer');


test("Test parsing numeric literal", () => {
    // arrange
    const program = `42;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [ {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NumericLiteral',
                    value: 42
                }
            }]
        }
    );
});

test("Test parsing string literal with double quotes", () => {
    // arrange
    const program = `"hello";`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [ {
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: "hello"
                }
            }]
        }
    );
});

test("Test parsing string literal with single quotes", () => {
    // arrange
    const program = `'hello';`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [ {
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: "hello"
                }
            }]
        }
    );
});

test("Test parsing program with extra whitespace", () => {
    // arrange
    const program = `     42;     `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'NumericLiteral',
                    value: 42
                }
            }]
        }
    );
});

test("Test parsing program with single line comments", () => {
    // arrange
    const program = `
        // i am a single line comment
        42;
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({ 
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'NumericLiteral',
                value: 42
            }
        }]
    });
});

test("Test parsing program with multi line comments", () => {
    // arrange
    const program = `
        /** 
         * i am a single line comment
         */ 
        42;
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({ 
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'NumericLiteral',
                value: 42
            }
        }]
    });
});

test("Test parsing multi line program with comments", () => {
    // arrange
    const program = `
        /** 
         * i am a single line comment
         */ 
        42;

        // and a different comment
        "hello";
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({ 
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'NumericLiteral',
                value: 42
            }
        }, {
            type: 'ExpressionStatement',
            expression: {
                type: 'StringLiteral',
                value: "hello"
            }
        }]
    });
});

// testing the tokenizer
test("Test hasMoreTokens with empty string", () => {
    // arrange
    const tokenizer = new Tokenizer();
    // act
    tokenizer.init('');
    // assert
    expect(tokenizer.hasMoreTokens()).toBe(false);
});

test("Test hasMoreTokens with non-empty string", () => {
    // arrange
    const tokenizer = new Tokenizer();
    // act
    tokenizer.init(`42`);
    // assert
    expect(tokenizer.hasMoreTokens()).toBe(true);
});

test("Test getNextToken with empty string", () => {
    // arrange
    const tokenizer = new Tokenizer();
    // act
    tokenizer.init('');
    // assert
    expect(tokenizer.getNextToken()).toBe(null);
});

test("Test getNextToken with non-empty string", () => {
    // arrange
    const tokenizer = new Tokenizer();
    // act
    tokenizer.init(`42`);
    // assert
    expect(tokenizer.getNextToken()).toStrictEqual(
        {
            type: 'NUMBER',
            value: '42'
        }
    );
});
