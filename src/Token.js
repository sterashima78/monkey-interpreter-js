import TokenType from "./TokenType"
export default class Token {
  static get keyword() {
    return {
      "fn": TokenType.FUNCTION,
      "let": TokenType.LET
    }
  }
  static LookupIdent(ident){
    return Token.keyword[ident] ? Token.keyword[ident] : TokenType.IDENT
  }

  constructor(type, literal){
    this.type = type
    this.literal = literal
  }

}