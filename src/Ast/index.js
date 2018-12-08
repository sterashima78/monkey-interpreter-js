export class Node {
  tokenLiteral(){}
}

/**
 * 戻り値がある
 */
export class Expression {
  constructor(node){
    this.node = node
  }
  expressionNode(){}
}

export class Program {
  /**
   * コンストラクタ
   * @param {Statement[]} statements 
   */
  constructor(statements = []){
    this.statements = statements
  }
}