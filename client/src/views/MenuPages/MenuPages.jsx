import { Link } from 'react-router-dom';

import '../../utils/styles/_utils.scss';

const MenuPages = () => {
    return (
        <div className='edit'>
            <h2 className='edit__title'>Редагування сторінок</h2>
            <Link to='/edit/main' className='button button--border'>
                Редагуваті головну
            </Link>
            <Link to='/edit/all-courses' className='button button--border'>
                Редагуваті усі послуги
            </Link>
            <Link to='/edit/team-building' className='button button--border'>
                Редагувати корпоративи
            </Link>
            <Link to='/edit/contacts' className='button button--border'>
                Редагувати контакти
            </Link>
            <Link to='/edit/public-offer' className='button button--border'>
                Редагувати публічну офферту
            </Link>
            <Link to='/admin' className='button button--border'>
                Назад
            </Link>
        </div>
    );
};

export default MenuPages;
