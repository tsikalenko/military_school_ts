import { Link, useParams } from 'react-router-dom';

import '../../utils/styles/_utils.scss';

const MenuEventData = () => {
    const { eventId } = useParams();

    return (
        <div className='container container--page'>
            <h2 className='title'>Данні події</h2>
            <Link
                to={`/edit/events/${eventId}`}
                className='button button--border'
            >
                Редагувати подію
            </Link>
            <Link
                to={`/events/participants/${eventId}`}
                className='button button--border'
            >
                Усі зареестрованні
            </Link>
            <Link to='/edit/events' className='button button--border'>
                Назад
            </Link>
        </div>
    );
};

export default MenuEventData;
