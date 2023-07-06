import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './mainInfo.scss';
import '../../utils/styles/_utils.scss';

const MainInfo = ({ data }) => {
    return (
        <div className='mainInfo'>
            {/*<h3 className='mainInfo__subtitle'>{data.title}</h3>*/}
            <h2 className='mainInfo__title'>{data.subtitle}</h2>
            <p className='mainInfo__text pre-wrap'>{data.description}</p>
            <Link
                to='/all-courses'
                className='button button--accent button--center button--fifteen'
            >
                Усі курси
            </Link>
        </div>
    );
};

MainInfo.propTypes = {
    data: PropTypes.object,
};

export default MainInfo;
