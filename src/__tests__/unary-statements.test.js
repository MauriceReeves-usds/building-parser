/* eslint-disable quotes */
/**
 * Main test runner
 */
const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Parser } = require('../Parser');

describe('All the unary operators', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test('test unary not', () => {
    const program = `
              !(x > 10 && y < 25);
          `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            argument: {
              type: 'LogicalExpression',
              operator: '&&',
              left: {
                type: 'BinaryExpression',
                operator: '>',
                left: {
                  type: 'Identifier',
                  name: 'x',
                },
                right: {
                  type: 'NumericLiteral',
                  value: 10,
                },
              },
              right: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                  type: 'Identifier',
                  name: 'y',
                },
                right: {
                  type: 'NumericLiteral',
                  value: 25,
                },
              },
            },
          },
        },
      ],
    });
  });

  test('test unary negative', () => {
    const program = '-x;';
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '-',
            argument: {
              type: 'Identifier',
              name: 'x',
            },
          },
        },
      ],
    });
  });

  test.skip('test decrement prefix', () => {
    const program = '--x;';
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '--',
            argument: {
              type: 'Identifier',
              name: 'x',
            },
          },
        },
      ],
    });
  });
});
