import { Link, useNavigate } from 'react-router-dom';
import '../../utils/styles/_utils.scss';
import PayBtnModal from '../../components/PayButtonModal';
import { useState } from 'react';

const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <div className='container container--page'>
            <h2 className='title title--sm'>Панель адміністратора</h2>
            <Link to='/editor' className='button button--border'>
                Редагувати сторінки
            </Link>
            <Link to='/edit/events' className='button button--border'>
                Редагувати події
            </Link>
            <button
                className='button button--border'
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Головну платіжна кнопка
            </button>
            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }}
                className='button button--border'
            >
                Вийти
            </button>
            {isModalOpen && <PayBtnModal setIsModalOpen={setIsModalOpen} />}
        </div>
    );
};

export default Admin;
