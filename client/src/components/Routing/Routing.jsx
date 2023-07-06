import { Route, Routes } from 'react-router-dom';
import Main from '../../views/Main';
import Contacts from '../../views/Contacts';
import AllServices from '../../views/AllServices';
import TeamBuilding from '../../views/TeamBuilding';
import EditMain from '../../views/EditMain';
import EditAllServices from '../../views/EditAllServices';
import EditTeamBuilding from '../../views/EditTeamBuilding';
import EditContacts from '../../views/EditContacts';
import Page404 from '../../views/Page404';
import Login from '../../views/Login';
import MenuPages from '../../views/MenuPages';
import PrivateRoute from '../PrivateRoute';
import Admin from '../../views/Admin/Admin';
import MenuEvents from '../../views/MenuEvents';
import EventForm from '../../views/EventForm';
import RegistrationForm from '../../views/RegistrationForm';
import InfoPage from '../../views/infoPage';
import MenuEventData from '../../views/MenuEventData';
import EventParticipant from '../../views/EventParticipant';
import Schedule from '../Schedule';
import DeleteParticipant from '../../views/DeleteParticipant';
import PublicOffer from '../../views/PublicOffer';
import EditPublicOffer from '../../views/EditPublicOffer';

const Routing = () => {
    const setPrivateElement = (element) => (
        <PrivateRoute>{element}</PrivateRoute>
    );

    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route
                path='/registration'
                element={<Schedule calendar={true} isPage={true} />}
            />
            <Route path='/all-courses' element={<AllServices />} />
            <Route path='/team-building' element={<TeamBuilding />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/events/'>
                <Route path=':eventId' element={<RegistrationForm />} />
                <Route path='data/:eventId' element={<MenuEventData />} />
                <Route
                    path='participants/:eventId'
                    element={<EventParticipant />}
                />
            </Route>
            <Route
                path='/gratitude/:payBtn'
                element={
                    <InfoPage
                        title='Дякуемо за реестрацію!'
                        content="Ми з зв'яжемося Вами найближчим часом."
                    />
                }
            />
            <Route
                path='/gratitude'
                element={
                    <InfoPage
                        title='Дякуемо за замовлення!'
                        content="Ми з зв'яжемося Вами найближчим часом."
                    />
                }
            />
            <Route path='/payment/'>
                <Route
                    path='successful'
                    element={
                        <InfoPage
                            title='Дякуемо за оплату!'
                            content='Платіж пройшов успішно'
                        />
                    }
                />
                <Route
                    path='error'
                    element={
                        <InfoPage
                            title='Нажль при сплаті трапилась помилка!'
                            content={
                                <a
                                    href='https://secure.wayforpay.com/button/bb727bef0c1df'
                                    className='button button--accent button--center'
                                    rel='noreferrer'
                                >
                                    Спробувати сплатити знов
                                </a>
                            }
                        />
                    }
                />
            </Route>
            <Route
                path='participant/delete/:id'
                element={<DeleteParticipant />}
            />
            <Route path='public-offer' element={<PublicOffer />} />

            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={setPrivateElement(<Admin />)} />
            <Route path='/editor' element={setPrivateElement(<MenuPages />)} />
            <Route path='/edit/'>
                <Route path='main' element={setPrivateElement(<EditMain />)} />
                <Route
                    path='all-courses'
                    element={setPrivateElement(<EditAllServices />)}
                />
                <Route
                    path='team-building'
                    element={setPrivateElement(<EditTeamBuilding />)}
                />
                <Route
                    path='contacts'
                    element={setPrivateElement(<EditContacts />)}
                />
                <Route
                    path='public-offer'
                    element={setPrivateElement(<EditPublicOffer />)}
                />
                <Route
                    path='events'
                    element={setPrivateElement(<MenuEvents />)}
                />
                <Route
                    path='events/:eventID'
                    element={setPrivateElement(<EventForm />)}
                />
            </Route>
            <Route
                path='/create-event'
                element={setPrivateElement(<EventForm />)}
            />

            <Route path='*' element={<Page404 />} />
        </Routes>
    );
};

export default Routing;
