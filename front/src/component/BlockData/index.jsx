import './index.css'

//

import { SUBTYPE, TYPEOPERATIONSIGN } from '../Load'

//

import { useNavigate } from 'react-router-dom';

//

export default function BlockData({ img, erunda, date, type, balance, currency = '$', sum = 0, typeOperation, id }) {

    const navigate = useNavigate();

    //

    const trunc = Math.trunc(sum)
    let fractions = Math.trunc(((sum - trunc) * 100).toFixed(2))
    fractions = fractions === 0 ? '.00' : `.${fractions}`

    //

    const handleClickBlock = () => {
        navigate(`/transaction/${id}`)
    }

    //

    return (

        <div className="block-data" onClick={id ? handleClickBlock : null}>
            <div className="block-data__info">
                <div className="block-data__info-icon">
                    <img src={img} alt="" />
                </div>
                <div className="block-data__info-detail">
                    <span className='erunda'>{erunda}</span>
                    <span className='datetype'>{date} - {SUBTYPE[type]}</span>
                </div>
            </div>
            {balance && (<div className={`block-data__summ trunc-${typeOperation}`}>
                <span className='block-data__info-type'>{TYPEOPERATIONSIGN[typeOperation]}</span>
                <span>{currency}</span>
                <span>{trunc}</span>
                <span className={`block-data__summ--cent fraction-${typeOperation}`}>{fractions}</span>
            </div>)}
        </div>
    )
}