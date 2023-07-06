import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { admin } from '../../api/userAPI';

const PrivateRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        token
            ? (async () => {
                  try {
                      setIsAdmin((await admin(token)).isAdmin);
                  } catch (err) {
                      localStorage.removeItem('token');
                      navigate('/login');
                  }
              })()
            : setIsAdmin(false);
    }, []);

    return isAdmin === null ? (
        <h2 className='loading'>Loading...</h2>
    ) : isAdmin ? (
        children
    ) : (
        <Navigate to='/login' state={{ from: location }} />
    );
};
PrivateRoute.propTypes = {
    children: PropTypes.object,
};

export default PrivateRoute;
