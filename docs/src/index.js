import Lexer from "../../src/Lexer"
import Type from "../../src/TokenType"
document.getElementById("input").addEventListener("keydown", (evt)=>{
  if(evt.key !== "Enter") return
  const l = new Lexer(evt.target.value)
  const div = document.createElement("div")
  div.innerHTML = `>> ${evt.target.value}`
  document.getElementById("log").appendChild(div)
  evt.target.value = ""
  for (let token = l.nextToken();token.type != Type.EOF;token = l.nextToken()) {
    const div = document.createElement("div")
    div.innerHTML = token
    document.getElementById("log").appendChild(div)
  }
  const obj = document.querySelector('html');
  obj.scrollTop = obj.scrollHeight;
})