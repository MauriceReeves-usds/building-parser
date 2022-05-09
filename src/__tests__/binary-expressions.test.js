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

 test("testing greater than", () => {
    // arrange
    const program = `x > 2;`;
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
                operator: '>',
                left: {
                    type: 'Identifier',
                    name: 'x',
                },
                right: {
                    type: 'NumericLiteral',
                    value: 2,
                }
            }
        }]
    });
 });

 test("testing less than", () => {
    // arrange
    const program = `x < 42;`;
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
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'x',
                },
                right: {
                    type: 'NumericLiteral',
                    value: 42,
                }
            }
        }]
    });
 });

 test("testing greater than or equal to", () => {
    // arrange
    const program = `x >= 2;`;
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
                operator: '>=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                },
                right: {
                    type: 'NumericLiteral',
                    value: 2,
                }
            }
        }]
    });
 });

 test("testing less than or equal to", () => {
    // arrange
    const program = `x <= 42;`;
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
                operator: '<=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                },
                right: {
                    type: 'NumericLiteral',
                    value: 42,
                }
            }
        }]
    });
 });

 test("binary operator precedence", () => {
    // arrange
    const program = `x + 5 > 10;`;
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
                operator: '>',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 5
                    }
                },
                right: {
                    type: 'NumericLiteral',
                    value: 10,
                }
            }
        }]
    });
 });
