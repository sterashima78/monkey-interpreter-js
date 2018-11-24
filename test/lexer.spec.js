import Type from "../src/TokenType"
import Token from "../src/Token"
import Lexer from "../src/Lexer"
describe("Lexer", ()=>{
  it("isLetter", ()=>{
    expect((new Lexer()).isLetter("a")).toBe(true)
    expect((new Lexer()).isLetter("l")).toBe(true)
    expect((new Lexer()).isLetter("e")).toBe(true)
    expect((new Lexer()).isLetter("t")).toBe(true)
    expect((new Lexer()).isLetter(1)).toBe(false)
  })

  it("isDigit", ()=>{
    expect((new Lexer()).isDigit("a")).toBe(false)
    expect((new Lexer()).isDigit("l")).toBe(false)
    expect((new Lexer()).isDigit(9)).toBe(true)
    expect((new Lexer()).isDigit(0)).toBe(true)
    expect((new Lexer()).isDigit(1)).toBe(true)
  })

  it("readIdentifier", ()=>{
    expect((new Lexer("let foo")).readIdentifier()).toBe("let")
  })

  it("readNumber", ()=>{
    expect((new Lexer("100 10")).readNumber()).toBe("100")
  })
  
  it("特別なトークンに変換する", ()=>{
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

  it("変数を含むトークンに変換する1", ()=>{
    const l = new Lexer(`let five = 5;`)
    const answers = [
      new Token(Type.LET, "let"),
      new Token(Type.IDENT, "five"),
      new Token(Type.ASSIGN, "="),
      new Token(Type.INT, "5"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.EOF, ""),
    ]
    answers.forEach( ans => {
      expect(l.nextToken()).toEqual(ans)
    })
  })

  it("変数を含むトークンに変換する2", ()=>{
    const l = new Lexer(`
    let ten = 10;
    `)
    const answers = [
      new Token(Type.LET, "let"),
      new Token(Type.IDENT, "ten"),
      new Token(Type.ASSIGN, "="),
      new Token(Type.INT, "10"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.EOF, ""),
    ]
    answers.forEach( ans => {
      expect(l.nextToken()).toEqual(ans)
    })
    
  })

  it("変数を含むトークンに変換する3", ()=>{
    const l = new Lexer(`
    let add = fn(x,y){
      x + y;
    }
    `)
    const answers = [
      new Token(Type.LET, "let"),
      new Token(Type.IDENT, "add"),
      new Token(Type.ASSIGN, "="),
      new Token(Type.FUNCTION, "fn"),
      new Token(Type.LPAREN, "("),
      new Token(Type.IDENT, "x"),
      new Token(Type.COMMA, ","),
      new Token(Type.IDENT, "y"),
      new Token(Type.RPAREN, ")"),
      new Token(Type.LBRACE, "{"),
      new Token(Type.IDENT, "x"),
      new Token(Type.PLUS, "+"),
      new Token(Type.IDENT, "y"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.RBRACE, "}"),
      new Token(Type.EOF, ""),
    ]
    answers.forEach( ans => {
      expect(l.nextToken()).toEqual(ans)
    })
    
  })

  it("変数を含むトークンに変換する4", ()=>{
    const l = new Lexer(`
    let result = add(five, ten);
    `)
    const answers = [
      new Token(Type.LET, "let"),
      new Token(Type.IDENT, "result"),
      new Token(Type.ASSIGN, "="),
      new Token(Type.IDENT, "add"),
      new Token(Type.LPAREN, "("),
      new Token(Type.IDENT, "five"),
      new Token(Type.COMMA, ","),
      new Token(Type.IDENT, "ten"),
      new Token(Type.RPAREN, ")"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.EOF, ""),
    ]
    answers.forEach( ans => {
      expect(l.nextToken()).toEqual(ans)
    })
  })

  it("演算子のトークン", ()=>{
    const l = new Lexer(`
    !-/*5;
    5 < 10 > 5;
    `)
    const answers = [
      new Token(Type.BANG, "!"),
      new Token(Type.MINUS, "-"),
      new Token(Type.SLASH, "/"),
      new Token(Type.ASTERISK, "*"),
      new Token(Type.INT, "5"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.INT, "5"),
      new Token(Type.LT, "<"),
      new Token(Type.INT, "10"),
      new Token(Type.GT, ">"),
      new Token(Type.INT, "5"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.EOF, ""),
    ]
    answers.forEach( ans => {
      expect(l.nextToken()).toEqual(ans)
    })
  })

  it("IF/ELSE", ()=>{
    const l = new Lexer(`
    if(5 < 10){
      return true;
    }else{
      return false;
    }
    `)
    const answers = [
      new Token(Type.IF, "if"),
      new Token(Type.LPAREN, "("),
      new Token(Type.INT, "5"),
      new Token(Type.LT, "<"),
      new Token(Type.INT, "10"),
      new Token(Type.RPAREN, ")"),
      new Token(Type.LBRACE, "{"),
      new Token(Type.RETURN, "return"),
      new Token(Type.TRUE, "true"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.RBRACE, "}"),
      new Token(Type.ELSE, "else"),
      new Token(Type.LBRACE, "{"),
      new Token(Type.RETURN, "return"),
      new Token(Type.FALSE, "false"),
      new Token(Type.SEMICOLON, ";"),
      new Token(Type.RBRACE, "}"),
      new Token(Type.EOF, ""),
    ]
    answers.forEach( ans => {
      expect(l.nextToken()).toEqual(ans)
    })
  })
})