import './index.css'

//

import BackButton from '../../component/BackButton'
import Field from '../../component/Field'
import Button from '../../component/Button'

import { Alert, LOAD_STATUS, SESSION_KEY } from '../../component/Load'

//

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//

export default function SendPage() {

    const navigate = useNavigate();

    //

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [email, setEmail] = useState(null)
    const [sum, setSum] = useState('')

    //

    const handleChange = (value) => {
        setEmail(value)

    }

    const handleChangeSum = (value) => {
        setSum(Number(value))
    }

    const handleSubmitSum = async (e) => {
        e.preventDefault()

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        if (!token) {
            navigate('/signin')
        }

        try {
            const res = await fetch('http://localhost:4000/send', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ email, sum, token })
            })

            const data = await res.json()

            if (res.ok) {

                setMessage(data.message)
                setStatus(LOAD_STATUS.SUCCESS)

            } else {
                setMessage(data.message)
                setStatus(LOAD_STATUS.ERROR)
            }

        } catch (error) {
            setMessage(error.message)
            setStatus(LOAD_STATUS.ERROR)
        }
    }

    return (
        <div className="send container">
            <BackButton title='Send' />

            <main className="send__main">

                <form className="form" onSubmit={handleSubmitSum}>
                    <Field label={"Email"} placeholder='Email' type='email' onChange={handleChange} />
                    <Field label={'Sum'} placeholder='Sum' type='text' onChange={handleChangeSum} value={true} />
                    <Button className='btn--simple'>Send</Button>
                </form>

                {(status === LOAD_STATUS.ERROR || status === LOAD_STATUS.SUCCESS) && (
                    <Alert status={status} message={message} />
                )}

            </main>
        </div>
    )
}