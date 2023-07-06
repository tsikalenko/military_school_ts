import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose, MdNoteAlt } from 'react-icons/md';
import { HashLink } from 'react-router-hash-link';

import './header.scss';
import '../../utils/styles/_utils.scss';
import { getUrl } from '../../api/urlsAPI';

const Header = () => {
    const navigate = useNavigate();
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const [payBtn, setPayBtn] = useState('');
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setPayBtn((await getUrl('mainPayBtn')).url);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    useEffect(() => {
        const resize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const openBurger = () => {
        setIsBurgerOpen(true);
    };
    const closeBurger = () => {
        setIsBurgerOpen(false);
    };

    useEffect(() => {
        if (width < 1200 && isBurgerOpen) {
            document.addEventListener('click', function func(event) {
                if (
                    event.target.closest('a') ||
                    (!event.target.closest('header') &&
                        !event.target.closest('.header__burger'))
                ) {
                    setIsBurgerOpen(false);
                    document.removeEventListener('click', func);
                }
            });
        }
    }, [width, isBurgerOpen]);

    const navClass = classNames({
        header__nav: true,
        nav: true,
        'nav--close': !isBurgerOpen,
    });

    return (
        <header className='header'>
            <div className='header__container container'>
                {width < 1200 && isBurgerOpen && (
                    <button className='header__burger' onClick={closeBurger}>
                        <MdClose className='header__img' />
                    </button>
                )}
                {width < 1200 && !isBurgerOpen && (
                    <button className='header__burger' onClick={openBurger}>
                        <GiHamburgerMenu className='header__img' />
                    </button>
                )}
                <Link to='/' className='header__link'>
                    <img
                        src='https://res.cloudinary.com/dv6xzqwka/image/upload/v1666514364/logo_white_clrx9s.png'
                        alt='mail logo'
                        className='header__logo'
                        width={100}
                        height={71}
                    />
                </Link>
                <ul className={navClass}>
                    <li className='nav__item'>
                        <HashLink to='/#about' className='nav__link'>
                            Про нас
                        </HashLink>
                    </li>
                    <li className='nav__item'>
                        <Link to='/all-courses' className='nav__link'>
                            Усі послуги
                        </Link>
                    </li>
                    <li className='nav__item'>
                        <Link to='/team-building' className='nav__link'>
                            Корпоративи
                        </Link>
                    </li>
                    <li className='nav__item'>
                        <Link to='/contacts' className='nav__link'>
                            Контакти
                        </Link>
                    </li>
                    <li className='nav__item nav__item--mobile nav__item--colored'>
                        {!isErrorLoading && (
                            <a
                                href={`https://secure.wayforpay.com/button/${payBtn}`}
                                className='nav__link'
                                rel='noreferrer'
                            >
                                Оплата
                            </a>
                        )}
                    </li>
                </ul>

                <div className='header__buttons'>
                    {!isErrorLoading && (
                        <a
                            href={`https://secure.wayforpay.com/button/${payBtn}`}
                            className='header__button header__registration--text'
                            rel='noreferrer'
                        >
                            Оплата
                        </a>
                    )}
                    <button
                        className=' header__button'
                        onClick={() => {
                            navigate('/registration');
                        }}
                    >
                        <MdNoteAlt className=' header__registration header__registration--img' />
                        <span className=' header__registration header__registration--text'>
                            Запис на курс
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
