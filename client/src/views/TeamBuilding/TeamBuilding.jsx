import Slider from '../../components/Slider';
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState } from 'react';
import { getPage } from '../../api/pagesAPI';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { sendTeamBuilding } from '../../api/mailerAPI';

import './teamBuilding.scss';

const TeamBuilding = () => {
    const [pageInfo, setPageInfo] = useState({});
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setPageInfo((await getPage('team-building')).data);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        (async () => {
            try {
                await sendTeamBuilding(data);
                navigate('/gratitude');
            } catch (err) {
                setError(err.response.data.message);
            }
        })();
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
                <div className='team-building container'>
                    <h2 className='team-building__title'>{pageInfo.title}</h2>

                    <div className='team-building__header'>
                        <Slider slides={pageInfo.slider} />

                        <div className='team-building__info'>
                            <h3 className='team-building__subtitle'>
                                {pageInfo.info.title}
                            </h3>
                            <p className='team-building__text pre-wrap'>
                                {pageInfo.info.description}
                            </p>
                            <HashLink
                                to='/team-building#form'
                                className='button button--center button--accent button--fifteen'
                            >
                                Замовити розрахунок
                            </HashLink>
                        </div>
                    </div>

                    <p className='team-building__text pre-wrap'>
                        {pageInfo.text}
                    </p>

                    <form
                        className='edit__form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='edit__item edit__item--sm'>
                            <input
                                type='text'
                                {...register('name', { required: true })}
                                className='edit__input edit__input--text'
                                placeholder={"Ім'я"}
                            />
                            {errors.name?.type === 'required' && (
                                <p role='alert' className='edit__error'>
                                    Ім{"'"}я обов{"'"}язкове
                                </p>
                            )}
                        </div>

                        <div className='edit__item edit__item--sm'>
                            <input
                                type='text'
                                {...register('phone', { required: true })}
                                className='edit__input edit__input--text'
                                placeholder={'Телефон'}
                            />
                            {errors.phone?.type === 'required' && (
                                <p role='alert' className='edit__error'>
                                    Телефон обов{"'"}язковий
                                </p>
                            )}
                        </div>

                        <div className='edit__item edit__item--sm'>
                            <input
                                type='text'
                                {...register('quantity', { required: true })}
                                className='edit__input edit__input--text'
                                placeholder={'Кількість чоловік'}
                            />
                            {errors.quantity?.type === 'required' && (
                                <p role='alert' className='edit__error'>
                                    Кількість чоловік обов{"'"}язкова
                                </p>
                            )}
                        </div>
                        {error && <p className='edit__error'>{error}</p>}
                        <input
                            type='submit'
                            className='button button--accent'
                            value='Замовити розрахунок'
                        />
                    </form>
                </div>
            )}
        </>
    );
};

export default TeamBuilding;
