import PropTypes from 'prop-types';

const EditSlider = ({ fields, register, remove }) => {
    return fields.map((item, index) => {
        return (
            <div className='edit__block' key={item.id}>
                <p className='edit__subtitle edit__subtitle--sm'>
                    Slide {index + 1}
                </p>
                <div className='edit__photo'>
                    <div className='edit__item'>
                        <label className='edit__label'>img:</label>
                        <input
                            type='url'
                            defaultValue={item.img}
                            {...register(`slider.${index}.img`, {
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
                            {...register(`slider.${index}.alt`, {
                                required: true,
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
                    Видалити поле
                </div>
            </div>
        );
    });
};

EditSlider.propTypes = {
    fields: PropTypes.array.isRequired,
    register: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};

export default EditSlider;
