import { useEffect, useState } from 'react';
import { deleteParticipant, getParticipant } from '../../api/paticipantsAPI';
import { useNavigate, useParams } from 'react-router-dom';

import '../../utils/styles/_utils.scss';

const DeleteParticipant = () => {
    const { id } = useParams();
    const [participant, setParticipant] = useState(null);
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setParticipant(await getParticipant(id));
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    const renderParticipant = () => {
        const keys = Object.keys(participant.data);
        return (
            <div className='event-participants__item'>
                <h3 className='event-participants__name'>Данні учасника</h3>
                {keys.map((field) => (
                    <div key={field} className='event-participants__field'>
                        <p className='event-participants__subtitle'>{field}:</p>
                        <p className='event-participants__value'>
                            {participant.data[field]}
                        </p>
                    </div>
                ))}
                <div className='event-participants__field'>
                    <p className='event-participants__subtitle'>Сплачено:</p>
                    <p className='event-participants__value'>
                        {participant.payment}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <>
            {isErrorLoading ? (
                <h2 className='error'>
                    Нажаль, виникла проблема зі завантаженням сторінки,
                    спробуйте оновити сторінку
                </h2>
            ) : participant === null ? (
                <h2 className='loading'>Loading...</h2>
            ) : (
                <div className='container--page'>
                    {renderParticipant()}
                    <button
                        className='button button--border button--center button--sm'
                        onClick={() => {
                            (async () => {
                                try {
                                    await deleteParticipant(id);
                                    navigate(-1);
                                } catch (err) {
                                    setIsErrorLoading(true);
                                }
                            })();
                        }}
                    >
                        Видалити реестрацію
                    </button>
                </div>
            )}
        </>
    );
};

export default DeleteParticipant;
