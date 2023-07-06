import Schedule from '../../components/Schedule';
import { Link } from 'react-router-dom';

import '../../utils/styles/_utils.scss';

const MenuEvents = () => {
    return (
        <div className='container container--color'>
            <p className='title'>Редагувати події</p>
            <Link
                to='/create-event'
                className='button button--border button--center'
            >
                Створиті нову подію
            </Link>
            <Schedule type={'edit'} calendar={true} />
            <Link to='/admin' className='button button--border button--center'>
                Назад
            </Link>
        </div>
    );
};

export default MenuEvents;
