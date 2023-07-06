import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getParticipantOfEvents } from '../../api/paticipantsAPI';

import './eventParticipant.scss';
import '../../utils/styles/_utils.scss';
import { FiPlusSquare } from 'react-icons/fi';
import PriceModal from '../../components/PriceModal';
import { sentEventParticipants } from '../../api/mailerAPI';

const EventParticipant = () => {
    const [participantsList, setParticipantsList] = useState(null);
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalParticipant, setModalParticipant] = useState(null);
    const { eventId } = useParams();
    const token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setParticipantsList(
                    await getParticipantOfEvents(eventId, token)
                );
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, [isModalOpen]);

    const handleClickSent = () => {
        (async () => {
            try {
                await sentEventParticipants(participantsList, eventId);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    };

    const openModal = (participant) => {
        setModalParticipant(participant);
        setIsModalOpen(true);
    };

    const renderParticipantsList = () => {
        return participantsList.map((participant, index) => {
            const keys = Object.keys(participant.data);
            return (
                <div key={participant._id} className='event-participants__item'>
                    <h3 className='event-participants__name'>
                        Учасник {index + 1}
                    </h3>
                    {keys.map((field) => (
                        <div key={field} className='event-participants__field'>
                            <p className='event-participants__subtitle'>
                                {field}:
                            </p>
                            <p className='event-participants__value'>
                                {participant.data[field]}
                            </p>
                        </div>
                    ))}
                    <div className='event-participants__field'>
                        <p className='event-participants__subtitle'>
                            Сплачено:
                        </p>
                        <p className='event-participants__value'>
                            {participant.payment} грн.
                        </p>
                        <FiPlusSquare
                            className='event-participants__btn accent'
                            onClick={() => {
                                openModal(participant);
                            }}
                        />
                    </div>
                    <button
                        className='button button--border button--center button--sm'
                        onClick={() => {
                            navigate(`/participant/delete/${participant._id}`);
                        }}
                    >
                        Видалити учасника
                    </button>
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
            ) : participantsList === null ? (
                <h2 className='loading'>Loading...</h2>
            ) : (
                <div className='event-participants container container--page'>
                    <h2 className='title'>Список учасників події</h2>
                    {Object.keys(participantsList).length === 0 && (
                        <p className='edit__subtitle'>
                            Cписок учасників порожній
                        </p>
                    )}
                    {renderParticipantsList()}
                    <div
                        onClick={handleClickSent}
                        className='button button--accent'
                    >
                        Отримати повний список
                    </div>
                    <Link
                        to={`/events/data/${eventId}`}
                        className='button button--border'
                    >
                        Назад
                    </Link>
                    {isModalOpen && (
                        <PriceModal
                            participant={modalParticipant}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default EventParticipant;
