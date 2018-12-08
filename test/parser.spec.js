import { Parser } from "../src/Parser/"
import Lexer from "../src/Lexer"
import TokenType from "../src/TokenType"
describe("Parser", ()=>{
  describe("LetStatement", ()=>{
    it("正常", ()=>{
      const input = `
      let x = 5;
      let y = 10;
      let foobar = 12345;
      `;
      const names = ["x", "y", "foobar"];
      const lexer = new Lexer(input)
      const parser = new Parser(lexer)
      const stmts = parser.parseProgram().statements
      expect(stmts).toHaveLength(3)
      stmts.forEach( (stmt, index )=> {
        expect(stmt.tokenLiteral()).toBe("let")
        expect(stmt.name.value).toBe(names[index])
        expect(stmt.name.tokenLiteral()).toBe(names[index])
      });
    })

    it("異常", ()=>{
      const input = `
      let x 5;
      let = 10;
      let 12345;
      `;
      const expects = [
        [TokenType.ASSIGN, TokenType.INT],
        [TokenType.IDENT, TokenType.ASSIGN],
        [TokenType.IDENT, TokenType.INT]
      ];
      const lexer = new Lexer(input)
      const parser = new Parser(lexer)
      parser.parseProgram()
      expect(parser.errors).toHaveLength(3)
      parser.errors.forEach( (error, index )=> {
        expect(error).toBe(`${expects[index][0].toString()} を期待しましたが ${expects[index][1].toString()} が検出されました。`)
      });
    })
  })

  describe("ReturnStatement", ()=>{
    it("正常", ()=>{
      const input = `
      return 5;
      return 10;
      return 12345;
      `;
      const lexer = new Lexer(input)
      const parser = new Parser(lexer)
      const stmts = parser.parseProgram().statements
      expect(stmts).toHaveLength(3)
      stmts.forEach( (stmt, index )=> {
        expect(stmt.tokenLiteral()).toBe("return")
      });
    })
  })
})