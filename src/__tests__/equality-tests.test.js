/**
 * tests of equality statement
 */

 const {Parser} = require('../Parser');

 test('check simple equality', () => {
    // arrange
    const program = `x == 10;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '==',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    }, 
                    right: {
                        type: 'NumericLiteral',
                        value: 10
                    }
                }
            }
        ]
    });
 });

 test('check simple inequality', () => {
    // arrange
    const program = `x != 10;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '!=',
                    left: {
                        type: 'Identifier',
                        name: 'x'
                    }, 
                    right: {
                        type: 'NumericLiteral',
                        value: 10
                    }
                }
            }
        ]
    });
 });

 test('check complex inequality', () => {
    // arrange
    const program = `x > 0 != false;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '!=',
                    left: {
                        type: 'BinaryExpression',
                        operator: '>',
                        left: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 0
                        }
                    }, 
                    right: {
                        type: 'BooleanLiteral',
                        value: false
                    }
                }
            }
        ]
    });
 });