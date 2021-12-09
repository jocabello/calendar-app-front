import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<CalendarScreen />} />
                <Route exact path="/login" element={<LoginScreen />} />
                <Route path='*' element={<Navigate replace to='/' /> } />
            </Routes>
        </BrowserRouter>
    )
}
