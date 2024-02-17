class Notification {
  
    static #list = []

    static #count = 1
  
    constructor(userId, {icon, title, date, desc} ) {
      this.id = Notification.#count++
      this.userId = userId
      this.icon = icon
      this.title = title
      this.date = date
      this.desc = desc   
    }
  
    static create = (user, data) => {
      const notification = new Notification(user.id, data)
      this.#list.push(notification)
  
      console.log(this.#list)
  
      return notification
    }

    // static add = (user, {icon, title, date, desc}) =>{
    //   // this.#list[user.id].push({icon, title, date, desc})
    //   console.log('-------------',this.#list)
    // }
  
    static getByUserId(user) {
      return (
        this.#list.filter(
          (note) =>
          note.userId === user.id,
        ) || null
      )
    }
  
    static getlist = () => this.#list

  }
  
  module.exports = { Notification }