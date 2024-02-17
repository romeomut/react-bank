import './index.css'

//

import balanceBell from './balance-bell.svg'
import balanceSetting from './balance-setting.svg'
import arrowDownRight from './arrow-down-right.svg'
import peopleSend from './people-send.svg'
import BlockData from '../../component/BlockData'

import { SESSION_KEY } from '../../component/Load'

//

import stripe from './icon/icon-3.svg'
import coinbase from './icon/icon-2.svg'
import people from './icon/icon-1.svg'

//

import { useNavigate } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'

//

export default function BalancePage() {

    const navigate = useNavigate();

    //

    const icons = { stripe, coinbase, people }

    //

    const [dt, setDat] = useState(null)
    const [trunc, setTrunc] = useState(null)
    const [fraction, setFraction] = useState(null)

    //

    const handleClickSetting = () => {
        navigate('/settings')
    }

    const handleClickNotifications = () => {
        navigate('/notifications')
    }

    //

    const handleClickRecive = () => {
        navigate('/recive')
    }

    const handleClickSend = () => {
        navigate('/send')
    }

    //

    const getData = async () => {

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        if (!token) {
            navigate('/signin')
        }

        try {
            const res = await fetch(`http://localhost:4000/balance/${token}`, { method: 'GET', })

            const data = await res.json()
            console.log(data)
            console.log(res.ok)

            if (res.ok) {
                setDat(data.data.listTransaction.reverse())
                console.log(data.data);

                const vTrunc = Math.trunc(data.data.balance)
                const vFractions = Math.trunc(((data.data.balance - vTrunc) * 100).toFixed(2))

                setTrunc(vTrunc)
                setFraction(vFractions === 0 ? '.00' : `.${vFractions}`)

            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => { getData() }, [])

    //

    const convertDate = (date) => {

        let noteDate = new Date(date)
        let dd1 = new Date(noteDate).getDate()
        let hh1 = new Date(noteDate).getHours()
        let m1 = new Date(noteDate).getMinutes()

        let currDate = new Date()
        let dd2 = new Date(currDate).getDate()

        if (dd1 === dd2) {
            return `${hh1}:${m1}`
        }

    }

    const chooseicon = (el) => {
        return el.email ? icons.people : icons[el.contragentPartner.toLowerCase()]
    }

    return (
        <div className="balance balance--background">
            <header className="balance-header container">
                <div className="balance-header__top">
                    <img src={balanceSetting} alt="" width="24" height="24" className="balance-header-btn" onClick={handleClickSetting} />
                    <h2 className='balance-header__top-title'>Main wallet</h2>
                    <img src={balanceBell} alt="" width="24" height="24" className="balance-header-btn" onClick={handleClickNotifications} />
                </div>

                <div className="balance-header__middle">
                    <span className='icon-currency'>$</span><span>{trunc && (trunc)}</span><span className='cent'>{fraction && (fraction)}</span>
                </div>

                <div className="balance-header__operation">
                    <div className="oparation__icon">
                        <img src={arrowDownRight} alt="" width="29" height="29" className='operation-border' onClick={handleClickRecive} />
                        <span className='oparation__icon-title'>Receive</span>
                    </div>
                    <div className="oparation__icon">
                        <img src={peopleSend} alt="" width="29" height="29" className='operation-border' onClick={handleClickSend} />
                        <span className='oparation__icon-title'>Send</span>
                    </div>
                </div>
            </header>
            <main className='balance-main container'>

                <div className="transaction">

                    {dt && (dt.map((el, key) =>
                        <Fragment key={key}>
                            <BlockData img={chooseicon(el)} erunda={el.contragentPartner} date={convertDate(el.date)} type={el.typeOperation} balance={true} note={false} sum={el.sum} typeOperation={el.typeOperation} id={el.id} />
                        </Fragment>
                    ))}

                </div>

            </main>
        </div>
    )
}