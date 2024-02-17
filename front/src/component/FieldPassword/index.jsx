import { useState } from 'react'

//

import { LOAD_STATUS, REG_EXP_PASSWORD, FIELD_ERROR } from '../Load'

// 

import './index.css'

export default function FieldPassword({ label, placeholder, onChange }) {

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [show, setShow] = useState(false)

    //

    const handleChangeIcon = () => {
        setShow(!show)
    }

    //

    const handleChange = (e) => {

        console.log(String(e.target.value).length)

        if (String(e.target.value).length < 1) {
            setStatus(LOAD_STATUS.ERROR)
            setMessage(FIELD_ERROR.IS_EMPTY)
        } else if (String(e.target.value).length > 20) {
            setStatus(LOAD_STATUS.ERROR)
            setMessage(FIELD_ERROR.IS_BIG)
        } else {
            setStatus(LOAD_STATUS.SUCCESS)
        }

        onChange(e.target.value)
    }

    return (

        <div className="form__item">

            <div className="field field--password">
                <label className="field__label">{label}</label>

                <div className="field__wrapper">
                    <input type={`${show ? "text" : "password"}`} className="field__input validation" placeholder={placeholder} autoComplete="current-password" onChange={handleChange} required />
                    <span className={`field__icon ${show ? "field__icon--show" : "field__icon--hide"}`} onClick={handleChangeIcon}></span>
                </div>

                {(status === LOAD_STATUS.ERROR) && (
                    <span className="form__error">{message}</span>)}
            </div>

        </div>
    )
}