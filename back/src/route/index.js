// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { Notification } = require('../class/notification')
const { Balance } = require('../class/balance')

//

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
  console.log('------------------------'); 
  console.log(User.getlist()); 
  console.log('------------------------'); 
  console.log(Confirm.getlist()); 
  console.log('------------------------'); 
  console.log(Session.getlist()); 
  console.log('------------------------'); 
  console.log(Notification.getlist()); 
  console.log('------------------------'); 
  console.log(Balance.getlist()); 
})

//
const LISTNOTES = {
  signup:{icon: 'sign', title:'Regisration', date: '', desc:'Warning'},
  signin:{icon: 'sign', title:'Autirization', date: '', desc:'Warning'},
  recovery:{icon: 'sign', title:'Recovery', date: '', desc:'Warning'},
  changeEmail:{icon: 'sign', title:'Change email', date: '', desc:'Warning'},
  changePassword:{icon: 'sign', title:'Change password', date: '', desc:'Warning'},
  recive:{icon: 'bell', title:'New reward system', date: '', desc:'Announcement'},
  send:{icon: 'bell', title:'New reward system', date: '', desc:'Announcement'},
}

//

const TYPEOPERATION = {SEND: 'send', RECIVE: 'recive'}

router.post('/signup', (req, res) => {

  const { email, password } = req.body

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Error. This user already exists!',
      })
    }

    const newUser = User.create({
      email,
      password
    })

    //

    const data = LISTNOTES.signup

    data.date = new Date()

    const newNote = Notification.create(
      newUser,
      data
    )

    //

    const session = Session.create(newUser)

    Confirm.create(newUser.email)

    return res.status(200).json({
      message: 'The user is successfully registered!',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating user!',
    })
  }

})

//

router.post('/signup-confirm', function (req, res) {

  const { code, token } = req.body

  if (!code || !token) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: 'The code does not exist!',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'The code is not valid!',
      })
    }

    session.user.isConfirm = true

    const user = User.getByEmail(session.user.email)
    user.isConfirm = true

    //

    const balance = Balance.create(session.user)

    if (!balance) {
      return res.status(400).json({
        message: 'Error opening user balance!',
      })
    }

    //

    return res.status(200).json({
      message: 'You have confirmed your email!',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//

router.post('/signin', function (req, res) {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Error. The password is incorrect!',
      })
    }

    const session = Session.create(user)

    //

    const data = LISTNOTES.signin

    data.date = new Date()

    const newNote = Notification.create(
      user,
      data
    )

    //

    return res.status(200).json({
      message: 'You are logged in!',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//

router.post('/recovery', function (req, res) {

  const { email } = req.body

  console.log(email)

  if (!email) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'User with such email does not exist!',
      })
    }

    Confirm.create(email)

    //

    const data = LISTNOTES.recovery

    data.date = new Date()
    
    const newNote = Notification.create(
      user,
      data
    )
    
    //

    return res.status(200).json({
      message: 'Recovery code sent!',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

// 

router.post('/recovery-confirm', function (req, res) {

  const { code, password } = req.body
  console.log(code, password)

  if (!code || !password) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'The code does not exist!',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'The user with this email does not exist!',
      })
    }

    user.password = password

    console.log(user)

    const session = Session.create(user)

    return res.status(200).json({
      message: 'Password changed!',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//

router.post('/change-email', function (req, res) {

  const { email, password, token } = req.body

  if (!email || !password || !token) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    //

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Error. The password is incorrect!',
      })
    }

    //

    const data = LISTNOTES.changeEmail

    data.date = new Date()
    
    const newNote = Notification.create(
      user,
      data
    )
    
    //

    const resultUser = User.changeEmail(session.user.email, email)
    const resultSession = Session.changeEmail(session.user.email, email)

    if (resultUser && resultSession) {
      return res.status(200).json({
        message: 'Your email changed!',
        session,
      })
    }else{
      return res.status(400).json({
        message: 'Error! The email has not been changed!',
      })
    }

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

})

//

router.post('/change-password', function (req, res) {

  const { oldPassword, newPassword, token } = req.body

  if (!oldPassword || !newPassword || !token) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    //

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({
        message: 'Error. The password is incorrect!',
      })
    }

    //

    const data = LISTNOTES.changePassword

    data.date = new Date()
    
    const newNote = Notification.create(
      user,
      data
    )
    
    //

    if (User.changePassword(session.user.email, newPassword)) {
      return res.status(200).json({
        message: 'Your password changed!',
        session,
      })
    }else{
      return res.status(400).json({
        message: 'Error! The password has not been changed!',
      })
    }

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

})

//

router.get('/notifications/:token', function (req, res) {

  const { token } = req.params

  console.log(token);

  if (!token) { 
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    //

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    //

    console.log(user);

    data = Notification.getByUserId(user)

    console.log('note', data);

    return res.status(200).json({
      data,
    })


  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }


})

//

router.post('/recive', function (req, res) {

  const { typeSystem, sum, token } = req.body

  if (!typeSystem || !sum || !token) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    //

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    //

    const data = LISTNOTES.recive

    data.date = new Date()
    
    const newNote = Notification.create(
      user,
      data
    )
    
    //

    const typeOperation = TYPEOPERATION.RECIVE
   
    const response = Balance.addTransaction({ user, contragentPartner: typeSystem, sum, typeOperation})

    console.log('12333',response);

    if (response.result) {
      return res.status(200).json({
        message: `Operation successful, id transaction # ${response.id}`
      })
    }else{
      return res.status(400).json({
        message: response.message,
      })
    }

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

})

//

router.get('/balance/:token', function (req, res) {

  const { token } = req.params

  console.log(token);

  if (!token) { 
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    //

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    //

    console.log(user);

    data = Balance.getById(user.id)

    console.log('note', data);

    return res.status(200).json({
      data,
    })


  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

})

//

router.post('/send', function (req, res) {

  const { email, sum, token } = req.body

  if (!email || !sum || !token) {
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    //

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    //

    const userReciver = User.getByEmail(email)

    if (!userReciver) {
      return res.status(400).json({
        message:
          'Error. Reciver with such email does not exist!',
      })
    }

  //

    let typeOperation = TYPEOPERATION.SEND
   
    let response = Balance.addTransaction({ user, contragentPartner:userReciver, sum, typeOperation})

    console.log('12333',response);

    if (!response.result) {
      return res.status(400).json({
        message: 'Not enough money!'
      })
    }

    //

    typeOperation = TYPEOPERATION.RECIVE
   
    response = Balance.addTransaction({ user: userReciver, contragentPartner: user, sum, typeOperation})

    console.log('12333',response);

    //

    let data = LISTNOTES.send

    data.date = new Date()
        
    let newNote = Notification.create(
      user,
      data
    )
    console.log('12333',response);    
    //

    data = LISTNOTES.recive

    data.date = new Date()
                
    newNote = Notification.create(
      userReciver,
      data
    )
                
    //

    if (response.result) {
      return res.status(200).json({
        message: `Operation successful, id transaction # ${response.id}`
      })
    }else{
      return res.status(400).json({
        message: response.message,
      })
    }

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

})

//

router.get('/transaction/:id/:token', function (req, res) {

  const { id, token } = req.params

  console.log(id);

  if (!id || !token) { 
    return res.status(400).json({
      message: 'Error. There are no required fields!',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'You are not logged in!',
      })
    }

    //

    const user = User.getByEmail(session.user.email)

    if (!user) {
      return res.status(400).json({
        message:
          'Error. User with such email does not exist!',
      })
    }

    //

    const transaction = Balance.getTransaction(id, user.id)

    if (!transaction) {
      return res.status(400).json({
        message:
          'Error. Transaction not found!',
      })
    }

    //

    // console.log('transaction', transaction);

    let date = new Date(transaction.date)
    const mm = new Date(date).getMonth()
    const dd = new Date(date).getDate()
    const hh = new Date(date).getHours()
    const m = new Date(date).getMinutes()

    const listMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    date = `${dd} ${listMonth[mm]}, ${hh}:${(m < 10 ? '0': '')}${m}`

    //

    const type = transaction.typeOperation.charAt(0).toUpperCase() + transaction.typeOperation.slice(1) 

    return res.status(200).json({
      sum: transaction.sum, 
      type: transaction.typeOperation,
      info:{
        date,
        address: transaction.email ? transaction.email : transaction.contragentPartner,
        type
      }
    })


  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

})


// Експортуємо глобальний роутер
module.exports = router
