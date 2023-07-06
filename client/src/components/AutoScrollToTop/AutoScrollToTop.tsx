import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AutoScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <></>;
};

export default AutoScrollToTop;
