/**
 * function declarations tests
 */

const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Parser } = require('../Parser');

describe('function declaration tests', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test('test simple function declaration', () => {
    const program = `
        def square(x) {
            return x * x;
        }
        //square(2);
    `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          name: {
            type: 'Identifier',
            name: 'square',
          },
          params: [
            {
              type: 'Identifier',
              name: 'x',
            },
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'BinaryExpression',
                  operator: '*',
                  left: {
                    type: 'Identifier',
                    name: 'x',
                  },
                  right: {
                    type: 'Identifier',
                    name: 'x',
                  },
                },
              },
            ],
          },
        },
      ],
    });
  });
});
