import './index.css'

//

import BackButton from '../../component/BackButton'
import TitlePage from '../../component/TitlePage'
import Field from '../../component/Field'
import Button from '../../component/Button'

import { Alert, LOAD_STATUS, SESSION_KEY } from '../../component/Load'

//

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

//

export default function SignupConfirmPage() {

    const navigate = useNavigate()

    //

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [code, setCode] = useState()

    //

    const handleChange = (value) => {
        setCode(Number(value))
    }

    //

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!code) {
            setMessage('Code required!')
            setStatus(LOAD_STATUS.ERROR)
        }

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        sendData(JSON.stringify({ code, token }))
    }

    const sendData = async (dataToSend) => {

        try {
            const res = await fetch('http://localhost:4000/signup-confirm', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: dataToSend
            })

            const data = await res.json()

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

    // 

    return (<div className='page container'>

        <BackButton />

        <div className="page__section">

            <TitlePage title='Confirm account' subtitle='Write the code you received' />

            <form className="form" onSubmit={handleSubmit}>
                <Field label='Code' placeholder='Your code' type='number' onChange={handleChange} />
                <Button className='btn--simple'>Confirm</Button>
            </form>

            {status === LOAD_STATUS.ERROR && (
                <Alert status={status} message={message} />
            )}

        </div>

    </div >
    )
}