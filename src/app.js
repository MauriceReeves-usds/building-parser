/**
 *
 */
const { Parser } = require('./Parser');

const program = `
     x *= 5;
 `;
const parser = new Parser();
const ast = parser.parse(program);
console.log(ast);
