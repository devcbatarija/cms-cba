import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux-toolkit/store/store.js';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:3001/api/";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </React.StrictMode>
    </Provider>
)
