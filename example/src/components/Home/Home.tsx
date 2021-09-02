import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from '@bbon/react-calendar';

import '@bbon/react-calendar/dist/Calendar.css';
import './Home.css';

export const Home = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Home - React Starter Kit</title>
            </Helmet>
            <div id="home">
                <h1>Hello World</h1>
                <p>React Starter Kit</p>
                <div>
                    <Calendar useMoveToYear useMoveToMonth />
                </div>
            </div>
        </React.Fragment>
    );
};
