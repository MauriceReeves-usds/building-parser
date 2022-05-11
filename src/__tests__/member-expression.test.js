/**
 * function declarations tests
 */

const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Parser } = require('../Parser');

describe('member expression tests', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test('simple member expression', () => {
    const program = `
        x.y;
    `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'Identifier',
              name: 'x',
            },
            property: {
              type: 'Identifier',
              name: 'y',
            },
          },
        },
      ],
    });
  });

  test('simple member property assignment', () => {
    const program = `
        x.y = 1;
    `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'x',
              },
              property: {
                type: 'Identifier',
                name: 'y',
              },
            },
            right: {
              type: 'NumericLiteral',
              value: 1,
            },
          },
        },
      ],
    });
  });

  test('computed member property assignment', () => {
    const program = `
        x[0] = 1;
    `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'x',
              },
              property: {
                type: 'NumericLiteral',
                value: 0,
              },
            },
            right: {
              type: 'NumericLiteral',
              value: 1,
            },
          },
        },
      ],
    });
  });

  test('nested object access', () => {
    const program = `
        a.b.c['d'];
    `;
    const ast = parser.parse(program);
    expect(ast).toStrictEqual({
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: true,
            object: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'a',
                },
                property: {
                  type: 'Identifier',
                  name: 'b',
                },
              },
              property: {
                type: 'Identifier',
                name: 'c',
              },
            },
            property: {
              type: 'StringLiteral',
              value: 'd',
            },
          },
        },
      ],
    });
  });
});
