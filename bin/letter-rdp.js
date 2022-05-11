#!/usr/bin/env node
/* eslint-disable no-console */

const { readFileSync } = require('fs');
const { Parser } = require('../src/Parser');

function main(argv) {
  const [,, mode, exp] = argv;
  const parser = new Parser();

  let ast = null;

  // pass in an arbitrary piece of code and let it compute the AST:
  // ./bin-letter.rdp.js -e 'let x = 2 + 2;'
  if (mode === '-e') {
    ast = parser.parse(exp);
  }

  // run example file like this: ./bin/letter-rdp.js -f ./src/__tests__/sample-file.lt
  if (mode === '-f') {
    const src = readFileSync(exp, 'utf-8');
    ast = parser.parse(src);
  }

  console.log(JSON.stringify(ast, null, 2));
}

main(process.argv);
