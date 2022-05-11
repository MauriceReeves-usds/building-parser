/* eslint-disable quotes */
/**
 * Main test runner
 */
const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Parser } = require('../Parser');

describe('All our iteration statement tests', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test('parse while loop', () => {
    const program = `
            while (x > 10) {
                x = x - 1;
            }
        `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'WhileStatement',
          test: {
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
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'x',
                  },
                  right: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                      type: 'Identifier',
                      name: 'x',
                    },
                    right: {
                      type: 'NumericLiteral',
                      value: 1,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    });
  });

  test('parse do while loop', () => {
    const program = `
            do {
                x = x - 1;
            } while (x > 10);
        `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'DoWhileStatement',
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'x',
                  },
                  right: {
                    type: 'BinaryExpression',
                    operator: '-',
                    left: {
                      type: 'Identifier',
                      name: 'x',
                    },
                    right: {
                      type: 'NumericLiteral',
                      value: 1,
                    },
                  },
                },
              },
            ],
          },
          test: {
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
        },
      ],
    });
  });

  test('parse for loop', () => {
    const program = `
            for (let i = 0; i < 10; i += 1) {
                x += i;
            }
        `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ForStatement',
          init: {
            type: 'VariableStatement',
            declarations: [
              {
                type: 'VariableDeclaration',
                id: {
                  type: 'Identifier',
                  name: 'i',
                },
                init: {
                  type: 'NumericLiteral',
                  value: 0,
                },
              },
            ],
          },
          test: {
            type: 'BinaryExpression',
            operator: '<',
            left: {
              type: 'Identifier',
              name: 'i',
            },
            right: {
              type: 'NumericLiteral',
              value: 10,
            },
          },
          update: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'Identifier',
              name: 'i',
            },
            right: {
              type: 'NumericLiteral',
              value: 1,
            },
          },
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '+=',
                  left: {
                    type: 'Identifier',
                    name: 'x',
                  },
                  right: {
                    type: 'Identifier',
                    name: 'i',
                  },
                },
              },
            ],
          },
        },
      ],
    });
  });

  test('parse for loop with empty initializer', () => {
    const program = `
            for (; ;) {
                x += i;
            }
        `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ForStatement',
          init: null,
          test: null,
          update: null,
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '+=',
                  left: {
                    type: 'Identifier',
                    name: 'x',
                  },
                  right: {
                    type: 'Identifier',
                    name: 'i',
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
