class Session {
  static #list = []

  constructor(user) {
    this.token = Session.generateCode()
    this.user = {
      email: user.email,
      isConfirm: user.isConfirm,
      id: user.id,
    }
  }

  static generateCode = () => {
    const length = 6
    const characters =
      'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789'

    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      result += characters[randomIndex]
    }

    return result
  }

  static create = (user) => {
    const session = new Session(user)

    this.#list.push(session)

    return session
  }

  static get = (token) => {
    return (
      this.#list.find((item) => item.token === token) ||
      null
    )
  }

  //

  static getlist = () => this.#list

  static changeEmail(oldEmail, newEmail) {
  
    const session = this.#list.find(
      (session) => session.user.email === String(oldEmail).toLowerCase()) 

    if (session.user) {
      session.user.email = newEmail 
      return true
    } 

    return false
  }
}

module.exports = { Session }