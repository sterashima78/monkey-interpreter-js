export default {
  ILLEGAL: Symbol("ILLEGAL"),
  EOF: Symbol("EOF"),

  IDENT: Symbol("IDENT"), //変数
  INT: Symbol("INT"), //数値
  
  ASSIGN: Symbol("="),
  PLUS: Symbol("+"),

  COMMA: Symbol("COMMA"),
  SEMICOLON: Symbol("SEMICOLON"),

  LPAREN: Symbol("("),
  RPAREN: Symbol(")"),

  LBRACE: Symbol("{"),
  RBRACE: Symbol("}"),

  FUNCTION: Symbol("FUNCTION"),
  LET: Symbol("LET")
}