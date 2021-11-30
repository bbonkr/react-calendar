import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from '@bbon/react-calendar';

import './Home.css';

export const Home = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const handleChangeSelection = useCallback(
        (start?: string, end?: string) => {
            console.info(start, end);

            setSelectedDates((_) => [start ?? '', end ?? '']);
        },
        [],
    );

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'min':
                setMin((_) => e.target.value);
                break;
            case 'max':
                setMax((_) => e.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div id="home">
                <div className="flex-row">
                    <div className="flex-column">
                        <label htmlFor="mindate-input">Min date:</label>
                        <input
                            id="mindate-input"
                            type="date"
                            value={min}
                            name="min"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="flex-column">
                        <label htmlFor="maxdate-input">Max date:</label>
                        <input
                            id="maxdate-input"
                            type="date"
                            value={max}
                            name="max"
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <Calendar
                    useMoveToYear
                    useMoveToMonth
                    highlightToday
                    showDate
                    minDate={min ? min : undefined}
                    maxDate={max ? max : undefined}
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
