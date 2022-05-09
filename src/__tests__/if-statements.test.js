/**
 * tests of the if statement
 */
const { expect, test } = require('@jest/globals');
const { Parser } = require('../Parser');

test('test a simple if else statement', () => {
  // arrange
  const program = `

        if (x) {
            x = 1;
        } else {
            x = 2;
        }

    `;
  const parser = new Parser();
  // act
  const ast = parser.parse(program);
  // assert
  expect(ast).toStrictEqual({
    type: 'Program',
    body: [
      {
        type: 'IfStatement',
        test: {
          type: 'Identifier',
          name: 'x',
        },
        consequent: {
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
                  type: 'NumericLiteral',
                  value: 1,
                },
              },
            },
          ],
        },
        alternate: {
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
                  type: 'NumericLiteral',
                  value: 2,
                },
              },
            },
          ],
        },
      },
    ],
  });
});

test('test a simple if statement', () => {
  // arrange
  const program = `

        if (x) {
            x = 1;
        }

    `;
  const parser = new Parser();
  // act
  const ast = parser.parse(program);
  // assert
  expect(ast).toStrictEqual({
    type: 'Program',
    body: [
      {
        type: 'IfStatement',
        test: {
          type: 'Identifier',
          name: 'x',
        },
        consequent: {
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
                  type: 'NumericLiteral',
                  value: 1,
                },
              },
            },
          ],
        },
        alternate: null,
      },
    ],
  });
});

test('test an if equality statement', () => {
  // arrange
  const program = `

        if (x == 42) {
            x = 1;
        }

    `;
  const parser = new Parser();
  // act
  const ast = parser.parse(program);
  // assert
  expect(ast).toStrictEqual({
    type: 'Program',
    body: [
      {
        type: 'IfStatement',
        test: {
          type: 'BinaryExpression',
          operator: '==',
          left: {
            type: 'Identifier',
            name: 'x',
          },
          right: {
            type: 'NumericLiteral',
            value: 42,
          },
        },
        consequent: {
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
                  type: 'NumericLiteral',
                  value: 1,
                },
              },
            },
          ],
        },
        alternate: null,
      },
    ],
  });
});
