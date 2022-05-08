/**
 * block statement test runner
 */
const {Parser} = require('../Parser');

test("test empty block statement", () => {
    // arrange
    const program = `
    {

    }
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [ {
                type: 'BlockStatement',
                body: []
            }]
        }
    );
});

test("test block statement with just comments", () => {
    // arrange
    const program = `
    {
        // single line comment

        /*
         * multiline comments
         */
    }
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [ {
                type: 'BlockStatement',
                body: []
            }]
        }
    );
});

test("test block statement with expressions", () => {
    // arrange
    const program = `
    {
        42;

        "hello";
    }
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [{
                type: 'BlockStatement',
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
            }]
        }
    );
});

test("test block statement with expressions and comments", () => {
    // arrange
    const program = `
    {
        // a single line comment
        42;

        /**
         * a multiline comment
         */  
        "hello";
    }
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [{
                type: 'BlockStatement',
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
            }]
        }
    );
});

test("test nested blocks", () => {
    // arrange
    const program = `
    {
        {
            // a single line comment
            42;
        }
        
        {
            /**
             * a multiline comment
             */  
            "hello";
        }
    }
    `;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual(
        { 
            type: 'Program',
            body: [{
                type: 'BlockStatement',
                body: [{
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'NumericLiteral',
                            value: 42
                        }
                    }]
                }, {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'StringLiteral',
                            value: "hello"
                        }
                    }]
                }]
            }]
        }
    );
});