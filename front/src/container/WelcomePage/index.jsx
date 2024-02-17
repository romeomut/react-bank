import './index.css'

//

import Button from '../../component/Button'

import { SESSION_KEY } from '../../component/Load'

//

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

//

export default function WelcomePage() {

    const navigate = useNavigate()

    //

    useEffect(() => {
        const session = localStorage.getItem(SESSION_KEY)

        if (session === 'object') {
            const { user } = JSON.parse(session)
            if (user.isConfirm) {
                navigate('/balance')
            }
        }
    },)

    return (
        <div className='wcome page page--background'>
            <div className="wcome__top">
                <h4 className='wcome__title'>Hello!</h4>
                <p className='wcome__subtitle'>Welcome to bank app</p>
                <div className='wcome__img'></div>
            </div>
            <div className='container'>
                <Button className='btn--simple' nav='/signup'>{'Sign Up'}</Button>
                <Button className='btn--simple-border' nav='/signin'>{'Sign In'}</Button>
            </div>
        </div>
    )
}