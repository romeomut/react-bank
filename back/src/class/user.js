class User {
  
    static #list = []
  
    static #count = 1
  
    constructor({ email, password }) {
      this.id = User.#count++
      this.email = String(email).toLowerCase()
      this.password = String(password)
      this.isConfirm = false
    }
  
    static create = (data) => {
      const user = new User(data)
      this.#list.push(user)
  
      console.log(this.#list)
  
      return user
    }
  
    static getByEmail(email) {
      return (
        this.#list.find(
          (user) =>
            user.email === String(email).toLowerCase(),
        ) || null
      )
    }
  
    static getById = (id) => {
      return (
        this.#list.find((user) => user.id === Number(id)) ||
        null
      )
    }
  
    static getlist = () => this.#list

    //

    static changeEmail(oldEmail, newEmail) {
  
        const user = this.#list.find(
          (user) => user.email === String(oldEmail).toLowerCase()) 

      if (user) {
        user.email = newEmail 
        return true
      } 

      return false
    }

    //

    static changePassword(email, password) {
  
      const user = this.#list.find(
        (user) => user.email === String(email).toLowerCase()) 

      if (user) {
        user.password = password 
        return true
      } 

      return false
    }
  }
  
  module.exports = { User }