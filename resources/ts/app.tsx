import './bootstrap.ts'
// import '../css/app.css'

import ReactDom from 'react-dom/client'
import React from 'react';
import Layout from './Shared/Layout';

const appContainer = document.getElementById('app');

if (appContainer) {
    ReactDom.createRoot(appContainer).render(<Layout />)
}