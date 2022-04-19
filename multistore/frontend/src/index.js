import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './Components/StoreSlice/store';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <CookiesProvider>
      <App/>
    </CookiesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
