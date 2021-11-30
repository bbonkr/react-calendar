import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
    return (
        <React.Fragment>
            <Helmet titleTemplate="%s - React Calendar example" />

            <nav id="header">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/hello-world">Does not exist page</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a
                            href="https://www.npmjs.com/package/@bbon/react-calendar"
                            target="_blank"
                            rel="noreferrer"
                            title="@bbon/react-calendar"
                        >
                            npm
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/bbonkr/react-calendar"
                            target="_blank"
                            rel="noreferrer"
                            title="bbonkr/react-calendar"
                        >
                            GitHub
                        </a>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
};
