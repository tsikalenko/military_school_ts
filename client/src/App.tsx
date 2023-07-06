import Header from './components/Header';
import Footer from './components/Footer';
import Routing from './components/Routing';

import '../src/utils/styles/_utils.scss';

function App() {
    return (
        <div
            className='app'
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dv6xzqwka/image/upload/v1666514364/cover_lcame0.jpg)',
            }}
        >
            <Header />
            <Routing />
            <Footer />
        </div>
    );
}

export default App;
