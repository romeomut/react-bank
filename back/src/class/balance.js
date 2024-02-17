const TYPEOPERATION = {
  SEND: 'send', RECIVE: 'recive'
}

class Balance {
  
    static #list = []
  
    static #count = 1
  
    constructor(user) {
      this.userId = user.id
      this.balance = 0
      this.listTransaction = []
    }
  
    static create = (user) => {
      const balance = new Balance(user)
      this.#list.push(balance)
  
      console.log(this.#list)

      return balance
    }

    static addTransaction = (data) =>{

      const {user, contragentPartner, sum, typeOperation } = data

      const balance = Balance.getById(user.id)

      //

      if (!balance) {
        return {result: false, message: 'Error. Balance not found!'}
      }

      //

      if(typeOperation === TYPEOPERATION.RECIVE){
        balance.balance += sum
      }else if (typeOperation === TYPEOPERATION.SEND) {
        console.log(balance);
        if (balance.balance < sum) {
          return {result: false, message: 'Not enough money!'}
        }
        
        balance.balance -= sum
      }

      const idTransaction = Balance.#count++

      balance.listTransaction.push(
        {id: idTransaction,
          date: new Date(),
          contragentPartner: contragentPartner.hasOwnProperty('email') ? contragentPartner.email : contragentPartner,
          sum,
          typeOperation,
          email: contragentPartner.hasOwnProperty('email') ? contragentPartner.email : null,
        })

        return {result: true, message: 'Success', id: idTransaction}
    }
  
    static getById = (id) => {
      return (
        this.#list.find((balance) => balance.userId === Number(id)) ||
        null
      )
    }

    //

    static getTransaction = (trnsactionId, userId) =>{

        const balance = Balance.getById(userId)

        if (!balance) {
          return {result: false, message: 'Error. Balance not found!'}
        }

        const transaction = balance['listTransaction'].find((el) =>  el.id === Number(trnsactionId))

        return transaction

    }
  
    static getlist = () => this.#list

  }
  
  module.exports = { Balance }