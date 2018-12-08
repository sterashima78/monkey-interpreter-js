import { Program } from "../Ast/"
import TokenType from "../TokenType"
import { LetStatement, ReturnStatement } from "../Ast/Statement"
import { Identifier } from "../Ast/Identifier";
export class Parser {
  constructor(lexer){
    this.lexer = lexer
    this.errors = []
    this.curToken = null
    this.peekToken = null
    this.nextToken()
    this.nextToken()
  }

  nextToken(){
    this.curToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  parseProgram(){
    const program = new Program()
    
    while (this.curToken.type != TokenType.EOF){
      const stmt = this.parseStatement();
      if(stmt) program.statements.push(stmt)
      this.nextToken()
    }
    return program
  }

  parseStatement(){
    if(this.curToken.type == TokenType.LET){
      return this.paseLetStatement()
    }
    else if(this.curToken.type == TokenType.RETURN){
      return this.paseReturnStatement()
    }
    else{
      return null
    }
  }

  paseReturnStatement(){
    const stmt = new ReturnStatement()
    stmt.token = this.curToken
    this.nextToken()

    if(!this.curTokenIs(TokenType.SEMICOLON)){
      this.nextToken()
    }

    // Expressionを代入する必要がある

    return stmt
  }

  paseLetStatement(){
    const stmt = new LetStatement()
    stmt.token = this.curToken
    if(!this.expectPeek(TokenType.IDENT)){
      return null
    }
    stmt.name = new Identifier(this.curToken)

    if(!this.expectPeek(TokenType.ASSIGN)){
      return null
    }

    if(!this.curTokenIs(TokenType.SEMICOLON)){
      this.nextToken()
    }

    // Expressionを代入する必要がある
    
    return stmt
  }

  curTokenIs(tokenType){
    return this.curToken.type == tokenType
  }

  peekTokenIs(tokenType){
    return this.peekToken.type == tokenType
  }

  expectPeek(tokenType){
    if(this.peekTokenIs(tokenType)){
      this.nextToken()
      return true
    }else{
      this.peekError(tokenType)
      return false
    }
  }

  peekError(tokenType){
    this.errors.push(`${tokenType.toString()} を期待しましたが ${this.peekToken.type.toString()} が検出されました。`)
  }
}