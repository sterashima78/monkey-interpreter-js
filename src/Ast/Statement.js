/**
 * 戻り値はない
 */
export class Statement {
  constructor(node){
    this.node = node
  }
  statementNode(){}
}

/**
 * 値を束縛する
 */
export class LetStatement extends Statement {
  constructor(node, token, name, value){
    super(node)
    this.token = token
    this.name = name
    this.value = value
  }

  tokenLiteral(){
    return this.token.literal
  }
}

/**
 * 値を返却する
 */
export class ReturnStatement extends Statement {
  constructor(node, token, value){
    super(node)
    this.token = token
    this.value = value
  }

  tokenLiteral(){
    return this.token.literal
  }
}