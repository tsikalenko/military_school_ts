import { useEffect, useState } from 'react';
import { getPage, updatePage } from '../../api/pagesAPI';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import '../../utils/styles/_edit.scss';
import '../../utils/styles/_utils.scss';

const EditAllServices = () => {
    const [pageInfo, setPageInfo] = useState({});
    const [pageID, setPageID] = useState('');
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => reset(pageInfo), [pageInfo]);

    useEffect(() => {
        (async () => {
            try {
                const pageData = await getPage('all-services');
                setPageInfo(pageData.data);
                setPageID(pageData._id);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: pageInfo,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services',
    });

    const onSubmit = (data) => {
        (async () => {
            try {
                await updatePage(pageID, data);
                navigate('/all-courses');
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    };

    const renderFields = () => {
        return fields.map((item, index) => {
            return (
                <div className='edit__block' key={item.id}>
                    <p className='edit__subtitle edit__subtitle--sm'>
                        Послуга {index + 1}
                    </p>
                    <div className='edit__photo'>
                        <div className='edit__item'>
                            <label className='edit__label'>title:</label>
                            <input
                                type='text'
                                defaultValue={item.title}
                                {...register(`services.${index}.title`, {
                                    required: true,
                                })}
                                className='edit__input edit__input--text'
                            />
                        </div>

                        <div className='edit__item'>
                            <label className='edit__label'>photo:</label>
                            <input
                                type='url'
                                defaultValue={item.photo}
                                {...register(`services.${index}.photo`, {
                                    required: true,
                                })}
                                className='edit__input edit__input--text'
                            />
                        </div>

                        <div className='edit__item'>
                            <label className='edit__label'>alt:</label>
                            <input
                                type='text'
                                defaultValue={item.alt}
                                {...register(`services.${index}.alt`, {
                                    required: true,
                                })}
                                className='edit__input edit__input--text'
                            />
                        </div>

                        <div className='edit__item'>
                            <label className='edit__label'>description:</label>
                            <textarea
                                defaultValue={item.description}
                                {...register(`services.${index}.description`, {
                                    required: true,
                                })}
                                className='edit__input edit__input--textarea'
                            />
                        </div>

                        <div className='edit__item'>
                            <label className='edit__label'>price:</label>
                            <input
                                type='number'
                                defaultValue={item.price}
                                {...register(`services.${index}.price`, {
                                    required: true,
                                })}
                                className='edit__input edit__input--text'
                            />
                        </div>

                        <div className='edit__item'>
                            <label className='edit__label'>
                                nearest event:
                            </label>
                            <input
                                type='date'
                                defaultValue={item.nearestEvent}
                                {...register(`services.${index}.nearestEvent`, {
                                    // required: true,
                                })}
                                className='edit__input edit__input--text'
                            />
                        </div>
                    </div>
                    <div
                        className='button button--border button--sm button--center'
                        onClick={() => {
                            remove(index);
                        }}
                    >
                        Видалити сервіс
                    </div>
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
                <div className='edit container'>
                    <h2 className='edit__title'>Редагування усіх послуг</h2>
                    <form
                        className='edit__form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <p className='edit__subtitle'>Header</p>

                        <div className='edit__item'>
                            <label className='edit__label'>Title:</label>
                            <input
                                type='text'
                                defaultValue={pageInfo.title}
                                {...register('title', { required: true })}
                                className='edit__input edit__input--text'
                            />
                        </div>

                        <p className='edit__subtitle'>Послуги</p>

                        {renderFields()}

                        <div
                            className='button button--border'
                            onClick={() => {
                                append({});
                            }}
                        >
                            Додати поле
                        </div>

                        <input
                            type='submit'
                            className='button button--accent'
                        />
                    </form>
                </div>
            )}
        </>
    );
};

export default EditAllServices;
