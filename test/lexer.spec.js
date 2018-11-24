import Type from "../src/TokenType"
import Token from "../src/Token"
import Lexer from "../src/Lexer"
describe("Lexer", ()=>{
  it("トークンに変換する", ()=>{
    const l = new Lexer("=+(){},;")
    const answers = [
      new Token(Type.ASSIGN, "="),
      new Token(Type.PLUS, "+"),
      new Token(Type.LPAREN, "("),
      new Token(Type.RPAREN, ")"),
      new Token(Type.LBRACE, "{"),
      new Token(Type.RBRACE, "}"),
      new Token(Type.COMMA, ","),
      new Token(Type.SEMICOLON, ";")
    ]
    answers.forEach( ans => {
      expect(l.nextToken()).toEqual(ans)
    })
    
  })
})