/**
 * tests of equality statement
 */

const {Parser} = require('../Parser');

test('logical and', () => {
    // arrange
    const program = `
        x > 7 && y < 17;
    `;
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
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'BinaryExpression',
                        operator: '>',
                        left: {
                            type: 'Identifier',
                            name: 'x'
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 7
                        }
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: '<',
                        left: {
                            type: 'Identifier',
                            name: 'y'
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 17
                        }
                    }
                }
            }
        ],
    });
});

test('logical or', () => {

});
