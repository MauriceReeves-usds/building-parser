/**
 * All our tokenizer tests
 */
const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Tokenizer } = require('../Tokenizer');

describe('all our tokenizer tests', () => {
  let tokenizer;

  beforeEach(() => {
    tokenizer = new Tokenizer();
  });

  // testing the tokenizer
  test('Test hasMoreTokens with empty string', () => {
    // act
    tokenizer.init('');
    // assert
    expect(tokenizer.hasMoreTokens()).toBe(false);
  });

  test('Test hasMoreTokens with non-empty string', () => {
    // act
    tokenizer.init('42');
    // assert
    expect(tokenizer.hasMoreTokens()).toBe(true);
  });

  test('Test getNextToken with empty string', () => {
    // act
    tokenizer.init('');
    // assert
    expect(tokenizer.getNextToken()).toBe(null);
  });

  test('Test getNextToken with non-empty string', () => {
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

  test.only('Test getNextToken with decimal number', () => {
    // act
    tokenizer.init('42.0');
    expect(tokenizer.getNextToken()).toStrictEqual({
      type: 'NUMBER',
      value: '42.0',
    });
  });
});
