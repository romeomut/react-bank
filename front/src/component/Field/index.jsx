import './index.css'

//

import { LOAD_STATUS, REG_EXP_EMAIL, FIELD_ERROR } from '../Load'

//

import { useState } from 'react'

//

export default function Field({ label, placeholder, type, onChange, value }) {

    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    //

    const [inputValue, setInputValue] = useState('')

    //

    const handleChange = (e) => {

        if (value) {
            onChange(e.target.value.replace(/[^.\d]+/g, "").replace(/^([^.]*\.)|\./g, '$1').replace(/(?<=^|-)0+/, ''))
            setInputValue(e.target.value.replace(/[^.\d]+/g, "").replace(/^([^.]*\.)|\./g, '$1').replace(/(?<=^|-)0+/, ''))
        } else {

            if (type === 'email') {
                if (!REG_EXP_EMAIL.test(String(e.target.value))) {
                    setStatus(LOAD_STATUS.ERROR)
                    setMessage(FIELD_ERROR.EMAIL)
                } else {
                    setStatus(LOAD_STATUS.SUCCESS)
                }
            }

            onChange(e.target.value)
        }
    }

    //

    const handleOnMouseLeave = (e) => {

        if (e.target.value === '.') {
            setInputValue('')
        } else {
            setInputValue(Number(e.target.value).toFixed(2))
        }
    }

    //

    return (
        <div className="form__item">

            <div className="field">

                {label && (
                    <label className={`field__label ${status === LOAD_STATUS.ERROR ? 'field__label--error' : ''}`}>{label}</label>
                )}

                {!value && (<input className={`field__input validation ${status === LOAD_STATUS.ERROR ? 'validation--active' : ''}`} placeholder={placeholder} type={type} autoComplete={label} onChange={handleChange} required />)}

                {value && (<input className={`field__input validation ${status === LOAD_STATUS.ERROR ? 'validation--active' : ''}`} placeholder={placeholder} type={type} autoComplete={label} onChange={handleChange} onMouseLeave={handleOnMouseLeave} required value={inputValue} min={1} />)}

            </div>

            {(status === LOAD_STATUS.ERROR) && (
                <span className="form__error">{message}</span>
            )}

        </div>
    )
}