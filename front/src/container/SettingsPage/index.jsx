import './index.css'

//

import BackButton from '../../component/BackButton'
import Field from '../../component/Field'
import FieldPassword from '../../component/FieldPassword'
import Button from '../../component/Button'

//

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//

import { Alert, LOAD_STATUS, SESSION_KEY } from '../../component/Load'

//

export default function SettingsPage() {

    const navigate = useNavigate();

    //

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    const [status2, setStatus2] = useState(null)
    const [message2, setMessage2] = useState('')

    //

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    //

    const handleChangeEmail = (value) => {
        setEmail(value)
        //
        setStatus(null)
    }

    const handleChangePassword = (value) => {
        setPassword(value)
        //
        setStatus(null)
    }

    //

    const handleChangeOldPassword = (value) => {
        setOldPassword(value)
        //
        setStatus2(null)
    }

    const handleChangeNewPassword = (value) => {
        setNewPassword(value)
        //
        setStatus2(null)
    }

    const handleSubmitChangeEmail = async (e) => {
        e.preventDefault();

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        if (!token) {
            navigate('/signin')
        }

        try {
            const res = await fetch('http://localhost:4000/change-email', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ email, password, token })
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem(SESSION_KEY, JSON.stringify(data.session))

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

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        if (!token) {
            navigate('/signin')
        }

        try {
            const res = await fetch('http://localhost:4000/change-password', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ oldPassword, newPassword, token })
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem(SESSION_KEY, JSON.stringify(data.session))

                setMessage2(data.message)
                setStatus2(LOAD_STATUS.SUCCESS)

            } else {
                setMessage2(data.message)
                setStatus2(LOAD_STATUS.ERROR)
            }

        } catch (error) {
            setMessage2(error.message)
            setStatus2(LOAD_STATUS.ERROR)
        }
    }

    const handleSubmitLogOut = (e) => {
        e.preventDefault();
        localStorage.setItem(SESSION_KEY, JSON.stringify(null),)
        navigate('/')
    }

    //

    return (
        <div className="settings container">
            <BackButton title='Settings' />
            <main className="settings__main">

                <div className="settings__main-title">Change email</div>

                <form className="form" onSubmit={handleSubmitChangeEmail}>
                    <Field label='Email' placeholder='Your email' type='email' onChange={handleChangeEmail} />
                    <FieldPassword label='Password' placeholder='Enter password' onChange={handleChangePassword} />
                    <Button className='btn--simple-border'>Continue</Button>
                </form>

                {(status === LOAD_STATUS.ERROR || status === LOAD_STATUS.SUCCESS) && (
                    <Alert status={status} message={message} />
                )}

                <div className="dvd"></div>

                <div className="settings__main-title">Change password</div>

                <form className="form" onSubmit={handleSubmitChangePassword} >
                    <FieldPassword label='Old password' placeholder='Enter old password' onChange={handleChangeOldPassword} />
                    <FieldPassword label='New password' placeholder='Enter new password' onChange={handleChangeNewPassword} />
                    <Button className='btn--simple-border'>Save Password</Button>
                </form>

                {(status2 === LOAD_STATUS.ERROR || status2 === LOAD_STATUS.SUCCESS) && (
                    <Alert status={status2} message={message2} />
                )}

                <div className="dvd"></div>

                <form className="form" onSubmit={handleSubmitLogOut} >
                    <Button className='btn--warning-border'>Log out</Button>
                </form>
            </main>
        </div>
    )
}