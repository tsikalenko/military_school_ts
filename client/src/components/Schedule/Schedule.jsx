import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllEvents, getEnableEvents } from '../../api/eventsAPI';
import PropTypes from 'prop-types';
import CustomCalendar from '../CustomCalendar';
import cclassNames from 'classnames';

import './schedule.scss';
import '../../utils/styles/_utils.scss';

const Schedule = ({ type, calendar, isPage }) => {
    const [events, setEvents] = useState(null);
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    const containerClass = cclassNames({
        container: true,
        'container--color': isPage,
    });

    useEffect(() => {
        (async () => {
            try {
                const events =
                    type === 'edit'
                        ? (await getAllEvents()).reverse()
                        : (await getEnableEvents()).sort((prev, next) => {
                              return prev.startDate > next.startDate ? 1 : -1;
                          });
                setEvents(events);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    const renderEvents = () => {
        return events.map((event, index) => {
            if (index < 3) {
                const img = event.img
                    ? event.img
                    : 'https://res.cloudinary.com/dv6xzqwka/image/upload/v1666514365/schedule1_jfg7kn.jpg';
                return (
                    <Link
                        key={event._id}
                        to={
                            type === 'edit'
                                ? `/events/data/${event._id}`
                                : `/events/${event._id}`
                        }
                        className='schedule__item'
                        style={{
                            backgroundImage: `url(${img})`,
                        }}
                    >
                        <h3 className='schedule__title'>{event.title}</h3>
                        <p className='schedule__date'>{event.startDate}</p>
                        <p className='schedule__date'>{event.startTime}</p>
                        <p className='schedule__slots'>
                            Вільних місць: {event.freeSlots}
                        </p>
                    </Link>
                );
            }
        });
    };

    return (
        <>
            {isErrorLoading ? (
                <h2 className='error'>
                    Нажаль, виникла проблема зі завантаженням сторінки,
                    спробуйте оновити сторінку
                </h2>
            ) : events === null ? (
                <h2 className='loading loading--sm'>Loading...</h2>
            ) : Object.keys(events).length === 0 ? (
                <h2 className='loading loading--sm'>
                    Нажаль зараз відсутні відкриті реестрації
                </h2>
            ) : (
                <div className={containerClass}>
                    <h3 className='subtitle'>Найближчі події</h3>
                    <div className='schedule'>{renderEvents()}</div>
                    {calendar && (
                        <>
                            <h3 className='subtitle'>Календар подій</h3>
                            <CustomCalendar type={type} events={events} />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

Schedule.propTypes = {
    type: PropTypes.string,
    calendar: PropTypes.bool,
    isPage: PropTypes.bool,
};

export default Schedule;
