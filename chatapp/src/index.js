import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './Store/Store';
import { Toaster } from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);