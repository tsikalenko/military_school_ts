import { useEffect, useState } from 'react';
import { getPage, updatePage } from '../../api/pagesAPI';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import '../../utils/styles/_edit.scss';
import '../../utils/styles/_utils.scss';

const EditPublicOffer = () => {
    const [pageInfo, setPageInfo] = useState(null);
    const [pageID, setPageID] = useState('');
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const pageData = await getPage('public-offer');
                setPageInfo(pageData.data);
                setPageID(pageData._id);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        (async () => {
            try {
                await updatePage(pageID, data);
                navigate('/public-offer');
            } catch (err) {
                setIsErrorLoading(true);
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
            ) : pageInfo === null ? (
                <h2 className='loading'>Loading...</h2>
            ) : (
                <div className='edit container'>
                    <h2 className='edit__title'>
                        Редагування сторінки публічної офферти
                    </h2>
                    <form
                        className='edit__form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='edit__item'>
                            <label className='edit__label'>Title:</label>
                            <input
                                type='text'
                                defaultValue={pageInfo.title}
                                {...register('title', { required: true })}
                                className='edit__input edit__input--text'
                            />
                        </div>

                        <div className='edit__item'>
                            <label className='edit__label'>Title:</label>
                            <textarea
                                defaultValue={pageInfo.text}
                                {...register('text', { required: true })}
                                className='edit__input edit__input--xxl'
                            />
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

export default EditPublicOffer;
