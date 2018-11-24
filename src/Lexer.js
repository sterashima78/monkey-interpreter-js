import Token from "./Token"
import TokenType from "./TokenType"
export default class Lexer {
  constructor(input = ""){
    this.input = input
    this.ch = ""
    this.rPos = 0
    this.pos = 0
    this.readChar()
  }

  readChar(){
    this.ch = this.rPos >= this.input.length ? 0 : this.input[this.rPos]
    this.pos = this.rPos
    this.rPos++
  }

  nextToken(){
    let token = new Token();
    switch (this.ch) {
      case "=":
        token = new Token(TokenType.ASSIGN, this.ch)
        break;
      case "+":
        token = new Token(TokenType.PLUS, this.ch)
        break;
      case "(":
        token = new Token(TokenType.LPAREN, this.ch)
        break;
      case ")":
        token = new Token(TokenType.RPAREN, this.ch)
        break;
      case "{":
        token = new Token(TokenType.LBRACE, this.ch)
        break;
      case "}":
        token = new Token(TokenType.RBRACE, this.ch)
        break;
      case ";":
        token = new Token(TokenType.SEMICOLON, this.ch)
        break;
      case ",":
        token = new Token(TokenType.COMMA, this.ch)
        break;
      case 0:
        token = new Token(TokenType.EOF, "")
      default:
        break;
    }
    this.readChar()
    return token
  }
}