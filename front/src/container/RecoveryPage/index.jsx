import './index.css'

//

import BackButton from '../../component/BackButton'
import TitlePage from '../../component/TitlePage'
import Field from '../../component/Field'
import Button from '../../component/Button'

import { Alert, LOAD_STATUS } from '../../component/Load'

//

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function RecoveryPage() {

    const navigate = useNavigate()

    //

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [email, setEmail] = useState()

    //

    const handleChange = (value) => {
        setEmail(value)
        console.log(value);
    }

    //

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Email required!')
            setStatus(LOAD_STATUS.ERROR)
        }

        sendData(JSON.stringify({ email }))
    }

    const sendData = async (dataToSend) => {

        try {
            const res = await fetch('http://localhost:4000/recovery', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: dataToSend
            })

            const data = await res.json()
            console.log(data)

            if (res.ok) {
                navigate('/recovery-confirm')
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
            <TitlePage title='Recover password' subtitle='Choose a recovery method' />
            <form className="form" onSubmit={handleSubmit}>
                <Field label='Email' placeholder='Your email' type='email' onChange={handleChange} />
                <Button className='btn--simple'>Send code</Button>
            </form>

            {status === LOAD_STATUS.ERROR && (<Alert status={status} message={message} />)}
        </div>

    </div >
    )
}