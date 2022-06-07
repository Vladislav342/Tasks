import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  	<React.StrictMode>
  		<Provider store = {store}>
  			<BrowserRouter>
    			<App />
    		</BrowserRouter>
    	</Provider>
  	</React.StrictMode>
);


reportWebVitals();
