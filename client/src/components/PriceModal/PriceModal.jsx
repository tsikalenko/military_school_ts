import './priceModal.scss';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { updateParticipant } from '../../api/paticipantsAPI';

const PriceModal = ({ participant, setIsModalOpen }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        (async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                await updateParticipant(
                    participant._id,
                    participant.eventId,
                    participant.data,
                    data.payment,
                    token
                );
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
                <div className='edit__item'>
                    <label className='edit__label'>Сплачено:</label>
                    <input
                        type='text'
                        defaultValue={participant.payment}
                        {...register('payment', { required: true })}
                        className='edit__input edit__input--text'
                    />
                </div>
                <input
                    type='submit'
                    value='Змінити'
                    className='button button--accent button--center button--eighteen'
                />
            </form>
        </div>
    );
};

PriceModal.propTypes = {
    participant: PropTypes.object.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
};

export default PriceModal;
