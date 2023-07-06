import { useEffect, useState } from 'react';
import { getPage } from '../../api/pagesAPI';

import '../../utils/styles/_utils.scss';

const PublicOffer = () => {
    const [pageInfo, setPageInfo] = useState(null);
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setPageInfo((await getPage('public-offer')).data);
            } catch (err) {
                setIsErrorLoading(true);
            }
        })();
    }, []);

    return (
        <>
            {isErrorLoading ? (
                <h2 className='error'>
                    Нажаль, виникла проблема зі завантаженням сторінки,
                    спробуйте оновити сторінку
                </h2>
            ) : pageInfo === null ? (
                <h2 className='loading'>Loading...</h2>
            ) : (
                <div className='container container--page'>
                    <h2 className='title'>{pageInfo.title}</h2>
                    <p className='light-color pre-wrap'>{pageInfo.text}</p>
                </div>
            )}
        </>
    );
};

export default PublicOffer;
