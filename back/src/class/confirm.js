class Confirm {
    static #list = []
  
    constructor(data) {
      this.code = Confirm.generateCode()
      this.data = data
    }
  
    static generateCode = () => {
      return Math.floor(Math.random() * 9000) + 1000
    }
  
    static create = (data) => {
      this.#list.push(new Confirm(data))
  
      setTimeout(() => {
        this.delete(code)
      }, 60 * 60 * 24 * 1000)
  
      console.log(this.#list)
    }
  
    static delete = (code) => {
      const length = this.#list
  
      this.#list = this.#list.filter(
        (item) => item.code !== code,
      )
  
      return length > this.#list.length
    }
  
    static getData = (code) => {
      const obj = this.#list.find(
        (item) => item.code === code,
      )
      return obj ? obj.data : null
    }

    static getlist = () => this.#list
  }
  
  module.exports = { Confirm }