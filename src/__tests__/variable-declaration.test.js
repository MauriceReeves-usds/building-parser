/**
 * variable assignment test runner
 */
 const {Parser} = require('../Parser');

 test("variable declaration with initialization", () => {
    // arrange
    const program = `let x = 42;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'VariableStatement',
            declarations: [{
                type: 'VariableDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'x'
                },
                init: {
                    type: 'NumericLiteral',
                    value: 42
                }
            }]
        }]
    });
 });

 test("variable declaration without initialization", () => {
    // arrange
    const program = `let x;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'VariableStatement',
            declarations: [{
                type: 'VariableDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'x'
                },
                init: null
            }]
        }]
    });
 });

 test("multiple variable declarations", () => {
    // arrange
    const program = `let x, y;`;
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [{
            type: 'VariableStatement',
            declarations: [{
                type: 'VariableDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'x'
                },
                init: null
            },
            {
                type: 'VariableDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'y'
                },
                init: null
            }]
        }]
    });
 });