import { useEffect, useState } from 'react';
import { getPage } from '../../api/pagesAPI';
import classNames from 'classnames';

import './allServices.scss';
import { Link } from 'react-router-dom';

const AllServices = () => {
    const [pageInfo, setPageInfo] = useState({});
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setPageInfo((await getPage('all-services')).data);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    const renderItems = () => {
        return pageInfo.services.map((item, index) => {
            const itemClass = classNames({
                services__item: true,
                'services__item--right': index % 2 !== 0,
            });
            return (
                <div className='services__block' key={item.title}>
                    <div className={itemClass}>
                        <div className='services__photo'>
                            <img
                                src={item.photo}
                                alt={item.alt}
                                className='services__img'
                                width={280}
                            />
                        </div>
                        <div className='services__info'>
                            <h3 className='services__subtitle'>{item.title}</h3>
                            <p className='services__text pre-wrap'>
                                {item.description}
                            </p>
                            <h3 className='services__subtitle services__subtitle--mt'>
                                Вартість: {item.price} грн.
                            </h3>
                            {item.nearestEvent && (
                                <h3 className='services__subtitle services__subtitle--mt'>
                                    Найближча подія: {item.nearestEvent}
                                </h3>
                            )}
                            <Link
                                to='/registration'
                                className='button button--accent button--center button--fifteen'
                            >
                                Записатись на курс
                            </Link>
                        </div>
                    </div>
                    <div className='line'></div>
                </div>
            );
        });
    };

    return (
        <>
            {isErrorLoading ? (
                <h2 className='error'>
                    Нажаль, виникла проблема зі завантаженням сторінки,
                    спробуйте оновити сторінку
                </h2>
            ) : Object.keys(pageInfo).length === 0 ? (
                <h2 className='loading'>Loading...</h2>
            ) : (
                <div className='services container'>
                    <h2 className='services__title'>{pageInfo.title}</h2>

                    {renderItems()}
                </div>
            )}
        </>
    );
};

export default AllServices;
