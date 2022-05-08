/**
 * empty statement test runner
 */
 const {Parser} = require('../Parser');

 test("check empty statement", () => {
    // arrange
    const program = ';';
    const parser = new Parser();
    // act
    const ast = parser.parse(program);
    // assert
    expect(ast).toStrictEqual({
        type: 'Program',
        body: [
            { type: 'EmptyStatement' }
        ]
    });
 });
