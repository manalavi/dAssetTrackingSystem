import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 500000,
  position: positions.TOP_CENTER,
  offset: '30px',
  transition: transitions.FADE
};


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider template={AlertTemplate} {...options}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
