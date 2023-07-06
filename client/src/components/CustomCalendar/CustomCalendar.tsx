import Calendar from 'react-awesome-calendar';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import './calendar.scss';

const CustomCalendar = ({ events, type }) => {
    const navigate = useNavigate();

    const createEventList = () => {
        return events.map((event) => ({
            id: event._id,
            color: '#808000',
            title: event.title,
            from: event.startDate + 'T' + event.startTime + ':00+00:00',
            to: event.endDate + 'T' + event.endTime + ':00+00:00'
        }));
    };

    const handlerClickEvent = (event) => {
        navigate(
            type === 'edit' ? `/events/data/${event}` : `/events/${event}`
        );
    };

    return (
        <Calendar
            current={{
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDay()
            }}
            events={createEventList()}
            mode={'monthlyMode'}
            onClickEvent={handlerClickEvent}
            className='calendar'
        />
    );
};

CustomCalendar.propTypes = {
    events: PropTypes.array.isRequired,
    type: PropTypes.string
};

export default CustomCalendar;
