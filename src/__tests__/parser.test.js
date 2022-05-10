/* eslint-disable quotes */
/**
 * Main test runner
 */
const { expect, test } = require('@jest/globals');
const { Parser } = require('../Parser');

test('Test parsing numeric literal', () => {
  // arrange
  const program = '42;';
  const parser = new Parser();
  // act
  const ast = parser.parse(program);
  // assert
  expect(ast).toStrictEqual(
    {
      type: 'Program',
      body: [{
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 42,
        },
      }],
    },
  );
});

test('Test parsing string literal with double quotes', () => {
  // arrange
  const program = '"hello";';
  const parser = new Parser();
  // act
  const ast = parser.parse(program);
  // assert
  expect(ast).toStrictEqual(
    {
      type: 'Program',
      body: [{
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: 'hello',
        },
      }],
    },
  );
});

test('Test parsing string literal with single quotes', () => {
  // arrange
  const program = `'hello';`;
  const parser = new Parser();
  // act
  const ast = parser.parse(program);
  // assert
  expect(ast).toStrictEqual(
    {
      type: 'Program',
      body: [{
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: 'hello',
        },
      }],
    },
  );
});

test('Test parsing program with extra whitespace', () => {
  // arrange
  const program = '     42;     ';
  const parser = new Parser();
  // act
  const ast = parser.parse(program);
  // assert
  expect(ast).toStrictEqual(
    {
      type: 'Program',
      body: [{
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 42,
        },
      }],
    },
  );
});

test('Test parsing program with single line comments', () => {
  // arrange
  const program = `
        // i am a single line comment
        42;
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
        type: 'NumericLiteral',
        value: 42,
      },
    }],
  });
});

test('Test parsing program with multi line comments', () => {
  // arrange
  const program = `
        /** 
         * i am a single line comment
         */ 
        42;
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
        type: 'NumericLiteral',
        value: 42,
      },
    }],
  });
});

test('Test parsing multi line program with comments', () => {
  // arrange
  const program = `
        /** 
         * i am a single line comment
         */ 
        42;

        // and a different comment
        "hello";
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
        type: 'NumericLiteral',
        value: 42,
      },
    }, {
      type: 'ExpressionStatement',
      expression: {
        type: 'StringLiteral',
        value: 'hello',
      },
    }],
  });
});
