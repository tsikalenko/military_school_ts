import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTelephone } from 'react-icons/bs';

import './footer.scss';
import { useEffect, useState } from 'react';
import { getPage } from '../../api/pagesAPI';
import { FaTelegramPlane, FaViber } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';

const Footer = () => {
    const [pageInfo, setPageInfo] = useState(null);
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setPageInfo((await getPage('contacts')).data);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    return (
        <>
            {isErrorLoading ? (
                <h2 className='error'>
                    Нажаль, виникла проблема зі завантаженням сторінки,
                    спробуйте оновити сторінку
                </h2>
            ) : (
                pageInfo !== null && (
                    <footer className='footer'>
                        <div className='container footer__container'>
                            <Link to='/' className='footer__logo'>
                                <img
                                    src='https://res.cloudinary.com/dv6xzqwka/image/upload/v1666514364/logo_white_clrx9s.png'
                                    alt='mail logo'
                                    className='footer__logo'
                                    width={150}
                                    height={107}
                                />
                            </Link>
                            <div className='footer__info'>
                                <div className='footer__contacts'>
                                    <BsTelephone className='footer__icon footer__icon--accent' />
                                    <a
                                        href={`tel:${pageInfo.phones[0]}`}
                                        className='footer__tel'
                                    >
                                        {pageInfo.phones[0]}
                                    </a>
                                </div>
                                <div className='footer__contacts'>
                                    <BsTelephone className='footer__icon footer__icon--accent' />
                                    <a
                                        href={`tel:${pageInfo.phones[1]}`}
                                        className='footer__tel'
                                    >
                                        {pageInfo.phones[1]}
                                    </a>
                                </div>
                                <div className='footer__contacts'>
                                    <BsTelephone className='footer__icon footer__icon--accent' />
                                    <a
                                        href={`tel:${pageInfo.phones[2]}`}
                                        className='footer__tel'
                                    >
                                        {pageInfo.phones[2]}
                                    </a>
                                </div>
                                {pageInfo && (
                                    <>
                                        <div className='footer__contacts'>
                                            <ImLocation className='contacts__icon contacts__icon--accent' />
                                            <a
                                                href={pageInfo.locationUrl}
                                                target='_blank'
                                                className='footer__tel'
                                                rel='noreferrer'
                                            >
                                                <p className='contacts__tel'>
                                                    {pageInfo.locationText}
                                                </p>
                                            </a>
                                        </div>
                                        <div className='footer__contacts'>
                                            <a
                                                href={`https://www.instagram.com/${pageInfo.instagram}/`}
                                                target='_blank'
                                                className='footer__social'
                                                rel='noreferrer'
                                            >
                                                <BsInstagram className='footer__icon inst-pink' />
                                            </a>
                                            <a
                                                href={`https://www.facebook.com/profile.php?id=${pageInfo.facebookId}`}
                                                target='_blank'
                                                className='footer__social'
                                                rel='noreferrer'
                                            >
                                                <BsFacebook className='footer__icon facebook-blue' />
                                            </a>
                                            <a
                                                href={`tg://resolve?domain=${pageInfo.telegram}`}
                                                target='_blank'
                                                className='footer__social'
                                                rel='noreferrer'
                                            >
                                                <FaTelegramPlane className='footer__icon tg-blue' />
                                            </a>
                                            <a
                                                href={`viber://chat/?number=%2B${pageInfo.viber}`}
                                                target='_blank'
                                                className='footer__social'
                                                rel='noreferrer'
                                            >
                                                <FaViber className='footer__icon viber-violet' />
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                            <ul className='footer__nav nav'>
                                <li className='nav__item'>
                                    <Link
                                        to='/all-courses'
                                        className='nav__link'
                                    >
                                        Усі послуги
                                    </Link>
                                </li>
                                <li className='nav__item'>
                                    <Link
                                        to='/team-building'
                                        className='nav__link'
                                    >
                                        Корпоративи
                                    </Link>
                                </li>
                                <li className='nav__item'>
                                    <Link to='/contacts' className='nav__link'>
                                        Контакти
                                    </Link>
                                </li>
                                <li className='nav__item'>
                                    <Link
                                        to='/public-offer'
                                        className='nav__link'
                                    >
                                        Публічна офферта
                                    </Link>
                                </li>
                                <li className='nav__item nav__item--accent'>
                                    <Link
                                        to='/registration'
                                        className='nav__link'
                                    >
                                        Запис на курс
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </footer>
                )
            )}
        </>
    );
};

export default Footer;
