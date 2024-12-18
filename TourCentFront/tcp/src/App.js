// src/App.js
import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Schedule from './BookingPage';
import Contacts from './Contacts';
import EnterPage from './EnterPage';
import RegPage from './RegPage';
import AboutUs from './AboutUs';
import UserProfile from './UserPage';
import GetHotels from './Hotellist';
import HotelPage from './HotelPage';
import BookingDetails from './BookingDetails';
import { AuthProvider, AuthContext } from './AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AuthContext.Consumer>
                    {({ isAuthenticated }) => (
                        <>
                            {isAuthenticated && <Header />}
                            <Routes>
                                <Route path="/" element={<EnterPage />} />
                                <Route path="/RegPage" element={<RegPage />} />
                                <Route path="/HomePage/:id" element={<Home />} />
                                <Route path="/BookingTick/:id" element={<Schedule />} />
                                <Route path="/Contacts/:id" element={<Contacts />} />
                                <Route path="/AboutUs/:id" element={<AboutUs />} />
                                <Route path="/HotelPage/:id" element={<GetHotels />} />
                                <Route path="/UserProfile/:id" element={<UserProfile />} />
                                <Route path="/hotels/:id" element={<HotelPage />} />
                                <Route path="/BookDetails/:id/:user_id" element={<BookingDetails />} />
                            </Routes>
                        </>
                    )}
                </AuthContext.Consumer>
            </Router>
        </AuthProvider>
    );
};

export default App;