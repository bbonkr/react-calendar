import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from '@bbon/react-calendar';

import './Home.css';
import '@bbon/react-calendar/dist/calendar.css';

export const Home = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    import('@bbon/react-calendar/dist/calendar.css');

    const handleChangeSelection = useCallback(
        (start?: string, end?: string) => {
            console.info(start, end);

            setSelectedDates((_) => [start ?? '', end ?? '']);
        },
        [],
    );

    return (
        <React.Fragment>
            <Helmet>
                <title>Home - React Starter Kit</title>
            </Helmet>
            <div id="home">
                <h1>Hello World !!</h1>
                <p>React Starter Kit</p>

                <Calendar
                    useMoveToYear
                    useMoveToMonth
                    highlightToday
                    showDate
                    // selections={selectedDates}
                    onChange={handleChangeSelection}
                />

                <dl>
                    <dt>Selected:</dt>
                    <dl>
                        {selectedDates.filter(Boolean).length > 0
                            ? selectedDates.filter(Boolean).join(',')
                            : ''}
                    </dl>
                </dl>
            </div>
        </React.Fragment>
    );
};
