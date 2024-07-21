/**
 * 
 * Coder class 
 * 
 */
class Coder {

  constructor() {
    this.symbols = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !#$%&()*+,-.:;<=>?@[]^_{|}~`
    this.base = this.symbols.length
  }

  //// Code the ASCII 
  ////
  code(ascii) {
    let code = ''

    do code += this.symbols.charAt(ascii % this.base)
    while ((ascii = Math.floor(ascii / this.base)) > 0)

    return code.split('')
      .reverse()
      .join('')
  }

  //// ASCII the code 
  ////
  ascii(code) {
    let ascii = 0

    code = code.split('').reverse()

    for (let i in code) {
      let s = code[i]
      let si = this.symbols.indexOf(s)

      ascii += si * Math.pow(this.base, i)
    }

    return ascii
  }
}

/**
 * 
 * ANCode class 
 * extends Coder class
 * 
 */
class ANCode extends Coder {

  constructor() {
    super()
    this.separators = `/'…±–‽¡«»≤≥‹›`
  }

  /////////////
  ////
  //// Getters
  ////
  /////////////

  get sepRegex() {
    return new RegExp(
      `[${this.separators}]`, 'gi')
  }

  //////////////////////
  ////
  //// Public functions
  ////
  //////////////////////

  //// Code plain text
  ////
  code(plain) {
    let tmpJoinSep = '\\'

    return plain.split('')
      .map(p => this.#codeOf(p))
      .join(tmpJoinSep)
      .split('')
      .map(anc => anc.replace(tmpJoinSep, this.#rndSep()))
      .join('')
  }

  //// Plain ANCode cipher
  ////
  plain(ancode) {
    return ancode.split(this.sepRegex)
      .map(anc => this.#plainOf(anc))
      .join('')
  }


  ///////////////////////
  ////
  //// Private functions
  ////
  ///////////////////////

  //// Code single plain character 
  ////
  #codeOf(p) {
    let ascii = p.charCodeAt(0)
    return super.code(ascii)
  }

  //// Plain single ANCode cipher
  ////
  #plainOf(anc) {
    let ascii = super.ascii(anc)
    return String.fromCharCode(ascii)
  }


  ///////////////////////
  ////
  //// Utility functions
  ////
  ///////////////////////

  //// Generate a random separator
  ////
  #rndSep() {
    return this.separators.charAt(Math.random() * this.separators.length)
  }
}