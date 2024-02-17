import './index.css'

//
import Field from '../../component/Field'
import Button from '../../component/Button'
import BackButton from '../../component/BackButton'
import { Alert, LOAD_STATUS, SESSION_KEY } from '../../component/Load'

//

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//

export default function RecivePage() {

    const navigate = useNavigate();

    //

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [typeSystem, setTypeSystem] = useState(null)

    //

    const [sum, setSum] = useState(0)

    //

    const handleChangeSum = (value) => {
        setSum(Number(value))
        //
        console.log(value);
    }

    const handleClick = (value) => {
        setTypeSystem(value)
        console.log(value);
    }

    //

    const handleSubmitSum = async (e) => {
        e.preventDefault();

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        if (!token) {
            navigate('/signin')
        }

        console.log({ typeSystem, sum, token });

        try {
            const res = await fetch('http://localhost:4000/recive', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ typeSystem, sum, token })
            })

            const data = await res.json()
            console.log(data)

            if (res.ok) {

                console.log(data);

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
        <div className="recive container">
            <BackButton title='Receive' />
            <main className="recive__main">

                <div className="recive__main-title">Receive amount</div>

                <form className="form" onSubmit={handleSubmitSum}>
                    <Field placeholder='Receive amount' type='text' onChange={handleChangeSum} value={true} />

                    <div className="dvd"></div>

                    <div className="recive__main-title">Payment system</div>

                    <Button className='btn--system' onClick={handleClick} typeButton={'stripe'}>Stripe</Button>
                    <Button className='btn--system' onClick={handleClick} typeButton={'coinbase'}>Coinbase</Button>
                </form>

                {(status === LOAD_STATUS.ERROR || status === LOAD_STATUS.SUCCESS) && (
                    <Alert status={status} message={message} />
                )}

            </main>
        </div>
    )
}