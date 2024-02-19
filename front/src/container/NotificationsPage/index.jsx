import './index.css'

//

import BackButton from '../../component/BackButton'
import BlockData from '../../component/BlockData'

//

import bell from './icon/ntf_bell.svg'
import sign from './icon/ntf_sign.svg'

//

import { SESSION_KEY } from '../../component/Load'

//

import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//

export default function NotificationsPage() {

    const icons = { bell, sign }

    //

    const [dt, setDt] = useState(null)

    //

    const navigate = useNavigate();

    //

    const getData = async () => {

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        if (!token) {
            navigate('/signin')
        }

        try {
            const res = await fetch(`http://localhost:4000/notifications/${token}`, { method: 'GET', })

            const data = await res.json()

            if (res.ok) {
                setDt(data.data.reverse())
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
        let hh2 = new Date(currDate).getHours()
        let m2 = new Date(currDate).getMinutes()

        if (hh1 === hh2) {
            const time = m2 - m1
            return `${time} min ago`
        } else if (dd1 === dd2) {
            const time = hh2 - hh1
            return `${time} hours ago`
        } else {
            const time = dd2 - dd1
            return `${time} day ago`
        }

    }

    return (
        <div className="notifications container">
            <BackButton title='Notifications' />

            <main className="notifications__main">
                {dt && (
                    dt.map((el, key) =>
                        <Fragment key={key}>
                            <BlockData img={icons[el.icon]} erunda={el.title} date={convertDate(el.date)} type={el.icon} balance={false} note={true} />
                        </Fragment>
                    )
                )}
            </main>
        </div>
    )
}