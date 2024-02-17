import './index.css'

//

import BackButton from '../../component/BackButton'

import { SESSION_KEY, TRANSACTIONINFO, TYPEOPERATIONSIGN } from '../../component/Load';

//

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//

export default function TransactionPage() {

    const navigate = useNavigate();

    //

    const [dat, setData] = useState(null)

    //

    const getData = async () => {

        const session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null

        const token = session ? session.token : null

        if (!token) {
            navigate('/signin')
        }

        const id = window.location.pathname.replace('/transaction/', '')

        try {
            const res = await fetch(`http://localhost:4000/transaction/${id}/${token}`, { method: 'GET', })

            const data = await res.json()
            console.log(data)
            console.log(res.ok)

            if (res.ok) {
                setData(data)
                console.log(data);

            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => { getData() }, [])

    //

    return (
        <div className="transactionpage container">
            <BackButton title='Transaction' />

            <main className="transactionpage__main">

                <div className={`sum-transaction sum-${dat && (dat.type)}`}>{dat && (`${TYPEOPERATIONSIGN[dat.type]}$${dat.sum.toFixed(2)}`)}</div>

                <div className="content-transaction">

                    {dat && (Object.entries(dat.info).map((q, w) =>
                        <div className="block-transaction">
                            <div className="block-transaction__left">{TRANSACTIONINFO[q[0]]}</div>
                            <div className="block-transaction__right">{q[1]}</div>
                        </div>
                    ))}

                </div>
            </main>
        </div>
    )
}