import './bootstrap.ts'
// import '../css/app.css'

import ReactDom from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const appContainer = document.getElementById('app');

if (appContainer) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        appContainer
    ) 
}