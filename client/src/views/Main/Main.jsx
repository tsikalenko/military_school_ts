import { Link } from 'react-router-dom';
import MainInfo from '../../components/MainInfo';
import Slider from '../../components/Slider';
import Schedule from '../../components/Schedule';
import { useEffect, useState } from 'react';
import { getPage } from '../../api/pagesAPI';

import './main.scss';
import '../../utils/styles/_utils.scss';

const Main = () => {
    const [pageInfo, setPageInfo] = useState({});
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setPageInfo((await getPage('main')).data);
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
            ) : Object.keys(pageInfo).length === 0 ? (
                <h2 className='loading'>Loading...</h2>
            ) : (
                <div className='main container'>
                    <h2 className='main__title'>{pageInfo.title}</h2>
                    <p className='main__description'>{pageInfo.description}</p>
                    <Link to='/team-building' className='button button--border'>
                        Корпоративи
                    </Link>
                    <Link to='/registration' className='button button--accent'>
                        Записатись на курс
                    </Link>
                    <section className='main__info'>
                        <Slider slides={pageInfo.slider} />
                        <MainInfo data={pageInfo.info} />
                    </section>

                    <Schedule />

                    <section id='about' className='main__about'>
                        <h3 className='main__subtitle'>
                            {pageInfo.text.title}
                        </h3>
                        <p className='main__text pre-wrap'>
                            {pageInfo.text.description}
                        </p>
                    </section>
                </div>
            )}
        </>
    );
};

export default Main;
