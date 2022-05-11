/**
 * function declarations tests
 */

const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Parser } = require('../Parser');

describe('function call tests', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test('simple function call', () => {
    const ast = parser.parse('foo(x);');
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'foo',
            },
            arguments: [
              {
                type: 'Identifier',
                name: 'x',
              },
            ],
          },
        },
      ],
    });
  });

  test('chained function call', () => {
    const ast = parser.parse('foo(x)();');
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo',
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'x',
                },
              ],
            },
            arguments: [],
          },
        },
      ],
    });
  });

  test('member function call', () => {
    const ast = parser.parse('console.log(x, y);');
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'console',
              },
              property: {
                type: 'Identifier',
                name: 'log',
              },
            },
            arguments: [
              {
                type: 'Identifier',
                name: 'x',
              },
              {
                type: 'Identifier',
                name: 'y',
              },
            ],
          },
        },
      ],
    });
  });
});
