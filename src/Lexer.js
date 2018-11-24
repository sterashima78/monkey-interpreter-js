import Token from "./Token"
import TokenType from "./TokenType"
export default class Lexer {
  constructor(input = ""){
    this.input = input
    this.ch = ""
    this.rPos = 0
    this.pos = 0
    this.count = 0
    this.readChar()
  }

  readChar(){
    this.ch = this.rPos >= this.input.length ? null : this.input[this.rPos]
    this.pos = this.rPos
    this.rPos++
  }

  nextToken(){
    this.skipWhitespace()
    let token = new Token();
    if(this.ch === "="){
      if(this.peekChar() == "="){
        const c = this.ch
        this.readChar()
        token = new Token(TokenType.EQ, c + this.ch )
      }else{
        token = new Token(TokenType.ASSIGN, this.ch)
      }
    }
    else if(this.ch === "+"){
      token = new Token(TokenType.PLUS, this.ch)
    }
    else if(this.ch === "("){
      token = new Token(TokenType.LPAREN, this.ch)
    }
    else if(this.ch === ")"){
      token = new Token(TokenType.RPAREN, this.ch)
    }
    else if(this.ch === "{"){
      token = new Token(TokenType.LBRACE, this.ch)
    }
    else if(this.ch === "}"){
      token = new Token(TokenType.RBRACE, this.ch)
    }
    else if(this.ch === ";"){
      token = new Token(TokenType.SEMICOLON, this.ch)
    }
    else if(this.ch === ","){
      token = new Token(TokenType.COMMA, this.ch)
    }
    else if(this.ch === "!"){
      if(this.peekChar() == "="){
        const c = this.ch
        this.readChar()
        token = new Token(TokenType.NOT_EQ, c + this.ch )
      }else{
        token = new Token(TokenType.BANG, this.ch)
      }
      
    }
    else if(this.ch === "-"){
      token = new Token(TokenType.MINUS, this.ch)
    }
    else if(this.ch === "/"){
      token = new Token(TokenType.SLASH, this.ch)
    }
    else if(this.ch === "*"){
      token = new Token(TokenType.ASTERISK, this.ch)
    }
    else if(this.ch === "<"){
      token = new Token(TokenType.LT, this.ch)
    }
    else if(this.ch === ">"){
      token = new Token(TokenType.GT, this.ch)
    }
    else if(this.ch === null){
      token = new Token(TokenType.EOF, "")
    }
    else if(this.isLetter(this.ch)){
      const literal = this.readIdentifier()
      return new Token(Token.LookupIdent(literal), literal)
    } 
    else if(this.isDigit(this.ch)){
      return new Token(TokenType.INT, this.readNumber())
    }
    else{
      token = new Token(TokenType.ILLEGAL, this.ch)
    }
    this.readChar()
    return token
  }

  readIdentifier(){
    const pos = this.pos
    while(this.isLetter(this.ch)){
      this.readChar()
    }
    return this.input.slice(pos, this.pos)
  }

  readNumber(){
    const pos = this.pos
    while(this.isDigit(this.ch)){
      this.readChar()
    }
    return this.input.slice(pos, this.pos)
  }

  isLetter(v){
    return 'a' <= v && v <= 'z' || 'A' <= v && v <= 'Z' || v == '_'
  }

  isDigit(v){
    return '0' <= v && v <= '9'
  }

  skipWhitespace(){
    while(this.ch == " " || this.ch == "\t" || this.ch == "\r" || this.ch == "\n") this.readChar()
  }

  peekChar(){
    return this.rPos >= this.input.length ? null : this.input[this.rPos]
  }
}