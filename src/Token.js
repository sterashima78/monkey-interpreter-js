import TokenType from "./TokenType"
export default class Token {
  static get keyword() {
    return {
      "fn": TokenType.FUNCTION,
      "let": TokenType.LET,
      "true": TokenType.TRUE,
      "false": TokenType.FALSE,
      "if": TokenType.IF,
      "else": TokenType.ELSE,
      "return": TokenType.RETURN
    }
  }
  static LookupIdent(ident){
    return Token.keyword[ident] ? Token.keyword[ident] : TokenType.IDENT
  }

  constructor(type, literal){
    this.type = type
    this.literal = literal
  }

  toString() {
    return `{Type: ${this.type.toString()}, literal: ${this.literal}}`
  }

}