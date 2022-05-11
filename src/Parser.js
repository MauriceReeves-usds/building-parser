/**
 * Letter parser
 */
const { Tokenizer } = require('./Tokenizer');

// ---------------------------------
// Default AST node factories
const DefaultFactory = {
  Program(body) {
    return {
      type: 'Program',
      body,
    };
  },
  EmptyStatement() {
    return {
      type: 'EmptyStatement',
    };
  },
  BlockStatement(body) {
    return {
      type: 'BlockStatement',
      body,
    };
  },
  ExpressionStatement(expression) {
    return {
      type: 'ExpressionStatement',
      expression,
    };
  },
  StringLiteral(value) {
    return {
      type: 'StringLiteral',
      value,
    };
  },
  NumericLiteral(value) {
    return {
      type: 'NumericLiteral',
      value,
    };
  },
  BinaryExpression(operator, left, right) {
    return {
      type: 'BinaryExpression',
      operator,
      left,
      right,
    };
  },
  AssignmentOperator(operator, left, right) {
    return {
      type: 'AssignmentExpression',
      operator,
      left,
      right,
    };
  },
  Identifier(name) {
    return {
      type: 'Identifier',
      name,
    };
  },
  VariableStatement(declarations) {
    return {
      type: 'VariableStatement',
      declarations,
    };
  },
  VariableDeclaration(id, init) {
    return {
      type: 'VariableDeclaration',
      id,
      init,
    };
  },
};

// ---------------------------------
// Default AST node factories
const SExpressionFactory = {
  Program(body) {
    return ['begin', body];
  },
  EmptyStatement() {},
  BlockStatement(body) {
    return ['begin', body];
  },
  ExpressionStatement(expression) {
    return expression;
  },
  StringLiteral(value) {
    return `"${value}"`;
  },
  NumericLiteral(value) {
    return value;
  },
  BinaryExpression(operator, left, right) {
    return [operator, left, right];
  },
};

const AST_MODE = 'default';

const factory = AST_MODE === 'default' ? DefaultFactory : SExpressionFactory;

class Parser {
  /**
     * Initialize the parser
     */
  constructor() {
    this.string = '';
    this.tokenizer = new Tokenizer();
  }

  /**
     * Parses a string into an AST
     * @param {*} string
     */
  parse(string) {
    this.string = string;
    this.tokenizer.init(string);

    // prime the tokenizer to obtain the first
    // token which is our lookahead. The lookahead is
    // used for predictive parsing
    this.lookahead = this.tokenizer.getNextToken();

    // parse recursively staring from the main
    // entry point
    return this.Program();
  }

  /**
     * Main entry point
     *
     * Program
     *  : StatementList
     *  ;
     */
  Program() {
    return factory.Program(this.StatementList());
  }

  /**
     * StatementList
     *  : Statement
     *  | StatementList Statement -> Statement Statement Statement Statement
     *  ;
     */
  StatementList(stopLookahead = null) {
    const statementList = [this.Statement()];

    while (this.lookahead != null && this.lookahead.type !== stopLookahead) {
      statementList.push(this.Statement());
    }

    return statementList;
  }

  /**
     * Statement
     *  : ExpressionStatement
     *  | BlockStatement
     *  | EmptyStatement
     *  | VariableStatement
     *  | IfStatement
     *  | IterationStatement
     *  | FunctionDeclaration
     *  | ReturnStatement
     *  ;
     */
  Statement() {
    switch (this.lookahead.type) {
      case ';':
        return this.EmptyStatement();
      case 'if':
        return this.IfStatement();
      case '{':
        return this.BlockStatement();
      case 'let':
        return this.VariableStatement();
      case 'def':
        return this.FunctionDeclaration();
      case 'return':
        return this.ReturnStatement();
      case 'do':
      case 'for':
      case 'while':
        return this.IterationStatement();
      default:
        return this.ExpressionStatement();
    }
  }

  /**
   * FunctionDeclaration
   *  : 'def' Identifier '(' OptFormalParameterList ')' BlockStatement
   */
  FunctionDeclaration() {
    this.eat('def');
    const name = this.Identifier();
    this.eat('(');
    const params = this.lookahead.type !== ')' ? this.FormalParameterList() : [];
    this.eat(')');
    const body = this.BlockStatement();

    return {
      type: 'FunctionDeclaration',
      name,
      params,
      body,
    };
  }

  /**
   * FormalParameterList
   *  : Identifier
   *  | FormalParameterList ',' Identifier
   */
  FormalParameterList() {
    const params = [];

    do {
      params.push(this.Identifier());
    } while (this.lookahead.type === ',' && this.eat(','));

    return params;
  }

  /**
   * ReturnStatement
   *  : 'return' OptExpression
   *  ;
   */
  ReturnStatement() {
    this.eat('return');
    const argument = this.lookahead.type !== ';' ? this.Expression() : null;
    this.eat(';');

    return {
      type: 'ReturnStatement',
      argument,
    };
  }

  /**
   * IterationStatement
   *  : WhileStatement
   *  | DoWhileStatement
   *  | ForStatement
   *  ;
   */
  IterationStatement() {
    switch (this.lookahead.type) {
      case 'while':
        return this.WhileStatement();
      case 'do':
        return this.DoWhileStatement();
      case 'for':
        return this.ForStatement();
      default:
        throw new SyntaxError(`Unknown Iteration Statement Type: ${this.lookahead.type}`);
    }
  }

  /**
   * WhileStatement
   *  : 'while' '(' Expression ')' Statement
   *  ;
   */
  WhileStatement() {
    this.eat('while');
    this.eat('(');
    const test = this.Expression();
    this.eat(')');
    const body = this.Statement();

    return {
      type: 'WhileStatement',
      test,
      body,
    };
  }

  /**
   * DoWhileStatement
   *  : 'do' Statement 'while' '(' Expression ')'
   *  ;
   */
  DoWhileStatement() {
    this.eat('do');
    const body = this.Statement();
    this.eat('while');
    this.eat('(');
    const test = this.Expression();
    this.eat(')');
    this.eat(';');

    return {
      type: 'DoWhileStatement',
      body,
      test,
    };
  }

  /**
   * ForStatement
   *  : 'for' '(' OptForStatementInit ';' OptExpression ';' OptExpression ')' Statement
   *  ;
   */
  ForStatement() {
    this.eat('for');
    this.eat('(');
    const init = this.lookahead.type !== ';' ? this.ForStatementInit() : null;
    this.eat(';');
    const test = this.lookahead.type !== ';' ? this.Expression() : null;
    this.eat(';');
    const update = this.lookahead.type !== ')' ? this.Expression() : null;
    this.eat(')');

    const body = this.Statement();

    return {
      type: 'ForStatement',
      init,
      test,
      update,
      body,
    };
  }

  /**
   * ForStatementInit
   *  : VariableStatementInit
   *  | Expression
   *  ;
   * ;
   */
  ForStatementInit() {
    if (this.lookahead.type === 'let') {
      return this.VariableStatementInit();
    }
    return this.Expression();
  }

  /**
     * IfStatement
     *  : 'if' '(' Expression ')' Statement
     *  | 'if' '(' Expression ')' Statement 'else' Statement
     *  ;
     */
  IfStatement() {
    this.eat('if');
    this.eat('(');
    const test = this.Expression();
    this.eat(')');
    const consequent = this.Statement();
    const alternate = this.lookahead != null && this.lookahead.type === 'else'
      ? this.eat('else') && this.Statement()
      : null;

    return {
      type: 'IfStatement',
      test,
      consequent,
      alternate,
    };
  }

  /**
   * VariableStatementInit
   *  : 'let' VariableDeclarationList
   *  ;
   */
  VariableStatementInit() {
    this.eat('let');
    const declarations = this.VariableDeclarationList();
    return {
      type: 'VariableStatement',
      declarations,
    };
  }

  /**
     * VariableStatement
     *  : VariableStatementInit ';'
     *  ;
     */
  VariableStatement() {
    const variableStatement = this.VariableStatementInit();
    this.eat(';');

    return variableStatement;
  }

  /**
     * VariableDeclarationList
     *  : VariableDeclaration
     *  | VariableDeclarationList ',' VariableDeclaration
     *  ;
     */
  VariableDeclarationList() {
    const declarations = [];

    do {
      declarations.push(this.VariableDeclaration());
    } while (this.lookahead.type === ',' && this.eat(','));

    return declarations;
  }

  /**
     * VariableDeclaration
     *  : Identifier OptVariableInitializer
     *  ;
     */
  VariableDeclaration() {
    const id = this.Identifier();

    const init = this.lookahead.type !== ';' && this.lookahead.type !== ','
      ? this.VariableInitializer()
      : null;

    return factory.VariableDeclaration(id, init);
  }

  /**
     * VariableInitializer
     *  : SIMPLE_ASSIGN AssignmentExpress
     *  ;
     */
  VariableInitializer() {
    this.eat('SIMPLE_ASSIGN');
    return this.AssignmentExpression();
  }

  /**
     * EmptyStatement
     *  : ';'
     *  ;
     */
  EmptyStatement() {
    this.eat(';');
    return factory.EmptyStatement();
  }

  /**
     * BlockStatement
     *  : '{' OptStatementList '}'
     *  ;
     */
  BlockStatement() {
    this.eat('{');

    const body = this.lookahead.type !== '}' ? this.StatementList('}') : [];

    this.eat('}');

    return factory.BlockStatement(body);
  }

  /**
     * ExpressionStatement
     *  : Expression ';'
     *  ;
     */
  ExpressionStatement() {
    const expression = this.Expression();
    this.eat(';');
    return factory.ExpressionStatement(expression);
  }

  /**
     * Expression
     *  : AssignmentExpression
     *  ;
     */
  Expression() {
    return this.AssignmentExpression();
  }

  static isAssignmentOperator(tokenType) {
    return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN';
  }

  static checkValidAssignmentTarget(node) {
    if (node.type === 'Identifier') {
      return node;
    }
    throw new SyntaxError('Invalid left-hand side in assignment expression');
  }

  /**
     * AssignmentExpression
     *  : LogicalORExpression
     *  | LeftHandSideExpression AssignmentOperator AssignmentExpression
     *  ;
     */
  AssignmentExpression() {
    const left = this.LogicalORExpression();

    if (!Parser.isAssignmentOperator(this.lookahead.type)) {
      return left;
    }

    return factory.AssignmentOperator(
      this.AssignmentOperator().value,
      Parser.checkValidAssignmentTarget(left),
      this.AssignmentExpression(),
    );
  }

  /**
     * EqualityExpression
     *  : RelationalExpression EQUALITY_OPERATOR EqualityExpression
     *  | RelationalExpression
     *  ;
     */
  EqualityExpression() {
    return this.BinaryExpression(
      'RelationalExpression',
      'EQUALITY_OPERATOR',
    );
  }

  /**
     * Relational Operators: >, >=, <, <=
     *
     * RelationalExpression
     *  : AdditiveExpression
     *  | AdditiveExpression RELATIONAL_OPERATOR RelationalExpression
     */
  RelationalExpression() {
    return this.BinaryExpression('AdditiveExpression', 'RELATIONAL_OPERATOR');
  }

  /**
     * AssignmentOperator
     *  : SIMPLE_ASSIGN
     *  | COMPLEX_ASSIGN
     *  ;
     */
  AssignmentOperator() {
    if (this.lookahead.type === 'SIMPLE_ASSIGN') {
      return this.eat('SIMPLE_ASSIGN');
    }
    return this.eat('COMPLEX_ASSIGN');
  }

  /**
     * LogicalANDExpression
     *  : EqualityExpression LOGICAL_AND LogicalANDExpression
     *  | EqualityExpression
     *  ;
     */
  LogicalANDExpression() {
    return this.LogicalExpression('EqualityExpression', 'LOGICAL_AND');
  }

  /**
     * LogicalORExpression
     *  : LogicalANDExpression LOGICAL_OR LogicalORExpression
     *  | LogicalORExpression
     *  ;
     */
  LogicalORExpression() {
    return this.LogicalExpression('LogicalANDExpression', 'LOGICAL_OR');
  }

  /**
     * Generic helper for logical expression nodes
     */
  LogicalExpression(builderName, operatorToken) {
    let left = this[builderName]();

    while (this.lookahead.type === operatorToken) {
      const operator = this.eat(operatorToken).value;
      const right = this[builderName]();
      left = {
        type: 'LogicalExpression',
        operator,
        left,
        right,
      };
    }

    return left;
  }

  /**
     * LeftHandSideExpression
     *  : PrimaryExpression
     *  ;
     */
  LeftHandSideExpression() {
    return this.PrimaryExpression();
  }

  Identifier() {
    const name = this.eat('IDENTIFIER').value;
    return factory.Identifier(name);
  }

  /**
     * AdditiveExpression
     *  : MultiplicativeExpression
     *  | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
     *  ;
     */
  AdditiveExpression() {
    return this.BinaryExpression(
      'MultiplicativeExpression',
      'ADDITIVE_OPERATOR',
    );
  }

  /**
     * MultiplicativeExpression
     *  : UnaryExpression
     *  | MultiplicativeExpression MULTIPLICATIVE_OPERATOR UnaryExpression
     *  ;
     */
  MultiplicativeExpression() {
    return this.BinaryExpression(
      'UnaryExpression',
      'MULTIPLICATIVE_OPERATOR',
    );
  }

  /**
     * Generic binary expression creation for both additive and multiplicative operators
     */
  BinaryExpression(builderName, operatorToken) {
    let left = this[builderName]();

    while (this.lookahead.type === operatorToken) {
      const operator = this.eat(operatorToken).value;
      const right = this[builderName]();
      left = factory.BinaryExpression(operator, left, right);
    }

    return left;
  }

  /**
   * UnaryExpression
   *  : LeftHandSideExpression
   *  | ADDITIVE_OPERATOR UnaryExpression
   *  | LOGICAL_NOT UnaryExpression
   *  ;
   */
  UnaryExpression() {
    let operator;
    switch (this.lookahead.type) {
      case 'ADDITIVE_OPERATOR':
        operator = this.eat('ADDITIVE_OPERATOR').value;
        break;
      case 'LOGICAL_NOT':
        operator = this.eat('LOGICAL_NOT').value;
        break;
      default:
        // we don't want to do anything here, fall through
        break;
    }

    if (operator != null) {
      return {
        type: 'UnaryExpression',
        operator,
        argument: this.UnaryExpression(),
      };
    }

    return this.LeftHandSideExpression();
  }

  /**
     * PrimaryExpression
     *  : Literal
     *  | ParenthesizedExpression
     *  | Identifier
     *  ;
     */
  PrimaryExpression() {
    if (Parser.isLiteral(this.lookahead.type)) {
      return this.Literal();
    }
    switch (this.lookahead.type) {
      case '(':
        return this.ParenthesizedExpression();
      case 'IDENTIFIER':
        return this.Identifier();
      default:
        return this.LeftHandSideExpression();
    }
  }

  static isLiteral(tokenType) {
    return (
      tokenType === 'NUMBER'
            || tokenType === 'STRING'
            || tokenType === 'true'
            || tokenType === 'false'
            || tokenType === 'null'
    );
  }

  /**
     * ParenthesizedExpression
     *  : '(' Expression ')'
     *  ;
     */
  ParenthesizedExpression() {
    this.eat('(');
    const expression = this.Expression();
    this.eat(')');
    return expression;
  }

  /**
     * Literal
     *  : NumericLiteral
     *  | StringLiteral
     *  ;
     */
  Literal() {
    switch (this.lookahead.type) {
      case 'NUMBER':
        return this.NumericLiteral();
      case 'STRING':
        return this.StringLiteral();
      case 'true':
        return this.BooleanLiteral(true);
      case 'false':
        return this.BooleanLiteral(false);
      case 'null':
        return this.NullLiteral();
      default:
        throw new SyntaxError(`Literal: unexpected literal production: "${this.lookahead.type}"`);
    }
  }

  /**
     * BooleanLiteral
     *  : 'true'
     *  | 'false'
     *  ;
     */
  BooleanLiteral(value) {
    this.eat(value ? 'true' : 'false');
    return {
      type: 'BooleanLiteral',
      value,
    };
  }

  /**
     * NullLiteral
     *  : 'null'
     *  ;
     */
  NullLiteral() {
    this.eat('null');
    return {
      type: 'NullLiteral',
      value: null,
    };
  }

  /**
     * StringLiteral
     *  : STRING
     *  ;
     */
  StringLiteral() {
    const token = this.eat('STRING');
    return factory.StringLiteral(token.value.slice(1, -1));
  }

  /**
     * NumericLiteral
     *  : NUMBER
     *  ;
     */
  NumericLiteral() {
    const token = this.eat('NUMBER');
    return factory.NumericLiteral(Number(token.value));
  }

  /**
     * Expects a token of a given type
     * @param {*} tokenType
     * @returns
     */
  eat(tokenType) {
    const token = this.lookahead;

    if (token == null) {
      throw new SyntaxError(
        `Unexpected end of input, expected: "${tokenType}"`,
      );
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: "${token.value}", expected: "${tokenType}"`,
      );
    }

    // advance to the next token
    this.lookahead = this.tokenizer.getNextToken();

    // return token
    return token;
  }
}

module.exports = { Parser };
