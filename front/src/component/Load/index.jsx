import './index.css'

export const LOAD_STATUS = {
    PROGRESS: 'pogress', SUCCESS: 'success', ERROR: 'error'
}

export function Alert({ message, status = 'default' }) {
    return (
        <div className={`alert alert--${status}`}>{message}</div>
    )
}

export const SESSION_KEY = 'sessionAuth'

export const TYPEOPERATION = { SEND: 'send', RECIVE: 'recive' }

export const TYPEOPERATIONSIGN = { send: '-', recive: '+' }

export const SUBTYPE = { send: 'Sending', recive: 'Receipt', sign: 'Warning', bell: 'Announcement' }

export const TRANSACTIONINFO = { date: 'Date', address: 'Address', type: 'Type' }

export const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,)

export const REG_EXP_PASSWORD = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,)

export const FIELD_ERROR = {
    IS_EMPTY: 'Enter a value in the field',
    IS_BIG: 'Very long value, remove excess',
    EMAIL: 'Enter the correct value of the e-mail address',
}
