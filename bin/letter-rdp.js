#!/usr/bin/env node
/* eslint-disable no-console */

const { readFileSync } = require('fs');
const { Parser } = require('../src/Parser');

function main(argv) {
  const [_node, _path, mode, exp] = argv;
  const parser = new Parser();

  let ast = null;

  if (mode === '-e') {
    ast = parser.parse(exp);
  }

  if (mode === '-f') {
    const src = readFileSync(exp, 'utf-8');
    ast = parser.parse(src);
  }

  console.log(JSON.stringify(ast, null, 2));
}

main(process.argv);
