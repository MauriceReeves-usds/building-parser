/**
 * variable assignment test runner
 */
 const {Parser} = require('../Parser');

 test("test simple variable assignment", () => {
    // arrange
    const program = `
        x = 42;
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
                type: 'AssignmentExpression',
                operator: '=',
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

 test("test chain variable assignment", () => {
    // arrange
    const program = `
        x = y = 42;
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
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'Identifier',
                    name: 'x',
                },
                right: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'y'
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 42,
                    }
                }
            }
        }]
    });
 });
