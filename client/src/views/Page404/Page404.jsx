import { useNavigate } from 'react-router-dom';

import './page404.scss';
import '../../utils/styles/_utils.scss';

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div className='page404 container'>
            <h2 className='page404__title'>Нажаль, сторінка не знайденна</h2>
            <button
                className='button button--accent'
                onClick={() => {
                    navigate('/');
                }}
            >
                На головну
            </button>
        </div>
    );
};

export default Page404;
