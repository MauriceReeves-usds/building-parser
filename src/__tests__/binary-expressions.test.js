/**
 * binary statements test runner
 */
 const {Parser} = require('../Parser');

 test("testing binary tests with simple expression", () => {
    // arrange
    const program = `2 + 2;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'NumericLiteral',
                    value: 2,
                },
                right: {
                    type: 'NumericLiteral',
                    value: 2,
                }
            }
        }]
    });
 });

 test("testing binary tests with nested expression", () => {
    // arrange
    const program = `3 + 2 - 2;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'NumericLiteral',
                        value: 3
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2
                    }
                },
                right: {
                    type: 'NumericLiteral',
                    value: 2,
                }
            }
        }]
    });
 });

 test("testing binary tests with simple multiplicative expression", () => {
    // arrange
    const program = `2 * 2;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'NumericLiteral',
                    value: 2,
                },
                right: {
                    type: 'NumericLiteral',
                    value: 2,
                }
            }
        }]
    });
 });

 test("testing binary tests with multiplicative chained expression", () => {
    // arrange
    const program = `2 + 2 * 2;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'NumericLiteral',
                    value: 2,
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'NumericLiteral',
                        value: 2
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2
                    }
                }
            }
        }]
    });
 });

 test("testing binary tests with nested expression", () => {
    // arrange
    const program = `2 * 2 * 2;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'NumericLiteral',
                        value: 2
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2
                    }
                },
                right: {
                    type: 'NumericLiteral',
                    value: 2,
                }
            }
        }]
    });
 });

 test("testing parenthetical binary tests with multiplicative chained expression", () => {
    // arrange
    const program = `(2 + 2) * 2;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '*',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'NumericLiteral',
                        value: 2
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2
                    }
                },
                right: {
                    type: 'NumericLiteral',
                    value: 2,
                },
            }
        }]
    });
 });
