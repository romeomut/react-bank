import './index.css'

//

import BackButton from '../../component/BackButton'
import TitlePage from '../../component/TitlePage'
import Field from '../../component/Field'
import FieldPassword from '../../component/FieldPassword'
import Button from '../../component/Button'

import { Alert, LOAD_STATUS, SESSION_KEY } from '../../component/Load'

//

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

//

export default function RecoveryConfirmPage() {

    const navigate = useNavigate();

    //

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    //

    const handleChangeCode = (value) => {
        setCode(value)
    }

    const handleChangePassword = (value) => {
        setPassword(value)
    }

    //

    const handleSubmit = (e) => {
        e.preventDefault();
        sendData(JSON.stringify({ code, password }))
    }

    const sendData = async (dataToSend) => {

        try {
            const res = await fetch('http://localhost:4000/recovery-confirm', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: dataToSend
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem(SESSION_KEY, JSON.stringify(data.session))
                navigate('/signin')
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
            <TitlePage title='Recover password' subtitle='Write the code you received' />
            <form className="form" onSubmit={handleSubmit}>
                <Field label='Code' placeholder='Your oode' type='number' onChange={handleChangeCode} />
                <FieldPassword label='New password' placeholder='Enter your new password' onChange={handleChangePassword} />
                <Button className='btn--simple'>Restore password</Button>
            </form>

            {status === LOAD_STATUS.ERROR && (<Alert status={status} message={message} />)}

        </div>

    </div >
    )
}