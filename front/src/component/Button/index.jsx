import './index.css'

//

import stripe from './icon/stripe.png'
import coinbase from './icon/coinbase.png'
import stripeIcon from './icon/stripe-icon.png'
import coinbaseIcon from './icon/coinbase-icon.png'

//

import { useNavigate } from 'react-router-dom';

//

const blockIcon = { stripe, coinbase }
const iconSystem = { 'stripe': stripeIcon, 'coinbase': coinbaseIcon }

//

export default function Button({ className, children, onClick, nav, typeButton }) {

    const navigate = useNavigate();

    const handlePushGo = (e) => {
        navigate(nav)
    }

    const handlePush = (e) => {
        onClick(e.target.name)
    }

    return (
        <>
            {!typeButton && (
                <button className={`btn  ${className}`} onClick={handlePushGo} name={children}>{children}</button>
            /* btn--disabled */)}

            {typeButton && (
                <div className="btn__out" >
                    <button className={`btn  ${className}`} name={children} onClick={handlePush}></button>

                    <div className="btn__inner">
                        <div className="btn__block">
                            <img src={iconSystem[typeButton]} alt={typeButton} width={40} height={40} />
                            {children}
                        </div>
                        <img src={blockIcon[typeButton]} alt={typeButton} width={160} height={20} />
                    </div>
                </div>
            /* btn--disabled */)

            }

        </>
    )
}