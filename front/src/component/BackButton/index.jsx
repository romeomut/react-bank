import './index.css'
import backButton from './back-button.svg'

//

import { useNavigate } from 'react-router-dom';

export default function BackButton({ title }) {
    const navigate = useNavigate();
    return (
        <header className='header'>
            <div className="back-button">
                <img src={backButton} alt="<" width="24" height="24" onClick={() => navigate(-1)} />
                {title && (
                    <h2 className='back-button__title'>{title}</h2>
                )}
            </div>
        </header>
    )
}