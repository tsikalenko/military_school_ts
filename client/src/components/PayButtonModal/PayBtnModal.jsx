import './priceModal.scss';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getUrl, updateUrl } from '../../api/urlsAPI';

const PriceModal = ({ setIsModalOpen }) => {
    const { register, handleSubmit } = useForm();
    const [payBtn, setPayBtn] = useState('');
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setPayBtn(await getUrl('mainPayBtn'));
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    const onSubmit = (data) => {
        (async () => {
            try {
                await updateUrl(payBtn._id, data.payBtn);
                setIsModalOpen(false);
            } catch (err) {
                setIsModalOpen(false);
            }
        })();
    };

    return (
        <div
            className='price-modal'
            onClick={(event) => {
                event.target.closest('form') || setIsModalOpen(false);
            }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='price-modal__form'
            >
                {isErrorLoading ? (
                    <h2 className='error'>
                        Нажаль, виникла проблема зі завантаженням сторінки,
                        спробуйте оновити сторінку
                    </h2>
                ) : (
                    <>
                        <div className='edit__item'>
                            <label className='edit__label'>
                                Головна платіжна кнопка:
                            </label>
                            <input
                                type='text'
                                defaultValue={payBtn.url}
                                {...register('payBtn', { required: true })}
                                className='edit__input edit__input--text'
                            />
                        </div>
                        <input
                            type='submit'
                            value='Змінити'
                            className='button button--accent button--center button--eighteen'
                        />
                    </>
                )}
            </form>
        </div>
    );
};

PriceModal.propTypes = {
    setIsModalOpen: PropTypes.func.isRequired,
};

export default PriceModal;
