/**
 * All our tokenizer tests
 */
const { expect, test } = require('@jest/globals');
const { Tokenizer } = require('../Tokenizer');

// testing the tokenizer
test('Test hasMoreTokens with empty string', () => {
  // arrange
  const tokenizer = new Tokenizer();
  // act
  tokenizer.init('');
  // assert
  expect(tokenizer.hasMoreTokens()).toBe(false);
});

test('Test hasMoreTokens with non-empty string', () => {
  // arrange
  const tokenizer = new Tokenizer();
  // act
  tokenizer.init('42');
  // assert
  expect(tokenizer.hasMoreTokens()).toBe(true);
});

test('Test getNextToken with empty string', () => {
  // arrange
  const tokenizer = new Tokenizer();
  // act
  tokenizer.init('');
  // assert
  expect(tokenizer.getNextToken()).toBe(null);
});

test('Test getNextToken with non-empty string', () => {
  // arrange
  const tokenizer = new Tokenizer();
  // act
  tokenizer.init('42');
  // assert
  expect(tokenizer.getNextToken()).toStrictEqual(
    {
      type: 'NUMBER',
      value: '42',
    },
  );
});
