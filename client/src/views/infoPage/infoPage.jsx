import { useNavigate, useParams } from 'react-router-dom';

import './gratitude.scss';
import '../../utils/styles/_utils.scss';
import PropTypes from 'prop-types';

const InfoPage = ({ title, content }) => {
    const navigate = useNavigate();
    const { payBtn } = useParams();

    return (
        <div className='gratitude container'>
            <h2 className='gratitude__title'>{title}</h2>
            <div className='gratitude__content'>{content}</div>
            {payBtn && (
                <a
                    href={`https://secure.wayforpay.com/button/${payBtn}`}
                    className='button button--accent'
                    rel='noreferrer'
                >
                    Оплата
                </a>
            )}
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

InfoPage.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.any,
};

export default InfoPage;
