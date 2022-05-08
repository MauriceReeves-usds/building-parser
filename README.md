# Learning Parsing into an AST

## Introduction
This is a base package of the lexxer and parser for a simple JS like language, as part of a larger exploration of how to build AST's for other languages.

The language we are building is a very simple JavaScript style language with a simplistic format for learning purposes.

## Grammar Rules
Below are the grammar rules for how the language will be parsed.

```
Program
    : StatementList
    ;

StatementList
    : Statement
    | StatementList Statement -> Statement Statement Statement Statement
    ;

Statement
    : ExpressionStatement
    | BlockStatement
    | EmptyStatement
    ;

EmptyStatement
    : ';'
    ;

BlockStatement
    : '{' OptStatementList '}'
    ;

ExpressionStatement
    : Expression ';'
    ;

Expression
    : Literal
    ;

AdditiveExpression
    : MultiplicativeExpression
    | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
    ;

MultiplicativeExpression
    : PrimaryExpression
    | MultiplicativeExpression MULTIPLICATIVE_OPERATOR PrimaryExpression
    ;

PrimaryExpression
    : Literal
    | ParenthesizedExpression
    ;

ParenthesizedExpression
    : '(' Expression ')'
    ;

Literal
    : NumericLiteral
    | StringLiteral
    ;

StringLiteral
    : STRING
    ;

NumericLiteral
    : NUMBER
    ;

```

## Conclusion
The outcome of this is to learn how to build an AST and then start building some other languages.
