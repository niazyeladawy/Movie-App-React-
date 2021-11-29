import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "react-alice-carousel/lib/alice-carousel.css";



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/#/'>
      <App />
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


