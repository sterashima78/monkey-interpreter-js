export class Identifier {
  constructor(token){
    this.token = token
    this.value = token.literal
  }
  tokenLiteral(){
    return this.value
  }
}