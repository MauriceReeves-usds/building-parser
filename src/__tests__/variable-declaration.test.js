/**
 * variable assignment test runner
 */
const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Parser } = require('../Parser');

describe('Variable declarations and assignments', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test('variable declaration with initialization', () => {
    // arrange
    const program = 'let x = 42;';
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
            name: 'x',
          },
          init: {
            type: 'NumericLiteral',
            value: 42,
          },
        }],
      }],
    });
  });

  test('variable declaration without initialization', () => {
    // arrange
    const program = 'let x;';
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
            name: 'x',
          },
          init: null,
        }],
      }],
    });
  });

  test('multiple variable declarations', () => {
    // arrange
    const program = 'let x, y;';
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
            name: 'x',
          },
          init: null,
        },
        {
          type: 'VariableDeclaration',
          id: {
            type: 'Identifier',
            name: 'y',
          },
          init: null,
        }],
      }],
    });
  });

  test('complex declaration and assignment', () => {
    const ast = parser.parse('let x = y + 1;');
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'VariableStatement',
          declarations: [
            {
              type: 'VariableDeclaration',
              id: {
                type: 'Identifier',
                name: 'x',
              },
              init: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                  type: 'Identifier',
                  name: 'y',
                },
                right: {
                  type: 'NumericLiteral',
                  value: 1,
                },
              },
            },
          ],
        },
      ],
    });
  });
});
