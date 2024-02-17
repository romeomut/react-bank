import './index.css'

//

import BackButton from '../../component/BackButton'
import TitlePage from '../../component/TitlePage'
import Field from '../../component/Field'
import FieldPassword from '../../component/FieldPassword'
import Button from '../../component/Button'

import { Alert, LOAD_STATUS, SESSION_KEY } from '../../component/Load'

//

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

//

export default function SigninPage() {

    const navigate = useNavigate();

    //

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //

    const handleChangeEmail = (value) => {
        setEmail(value)
        console.log(value);
    }

    const handleChangePassword = (value) => {
        setPassword(value)
        console.log(value);
    }

    //

    const handleSubmit = (e) => {
        e.preventDefault();
        sendData(JSON.stringify({ email, password }))
    }

    const sendData = async (dataToSend) => {

        try {
            const res = await fetch('http://localhost:4000/signin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: dataToSend
            })

            const data = await res.json()
            console.log(data)

            if (res.ok) {
                localStorage.setItem(SESSION_KEY, JSON.stringify(data.session))
                navigate('/balance')
            } else {
                setMessage(data.message)
                setStatus(LOAD_STATUS.ERROR)
            }

        } catch (error) {
            setMessage(error.message)
            setStatus(LOAD_STATUS.ERROR)
        }

    }

    return (<div className='page container'>
        <BackButton />
        <div className="page__section">
            <TitlePage title='Sign in' subtitle='Select login method' />
            <form className="form" onSubmit={handleSubmit}>
                <Field label='Email' placeholder='Your email' type='email' onChange={handleChangeEmail} />
                <FieldPassword label='Password' placeholder='Enter password' onChange={handleChangePassword} />
                <span className="link__prefix">Forgot your password? <Link to="/recovery" className="link">Restore</Link></span>
                <Button className='btn--simple'>{'Continue'}</Button>
            </form>

            {status === LOAD_STATUS.ERROR && (<Alert status={status} message={message} />)}

        </div>

    </div >
    )
}