import React from "react";
import {Route, Routes} from "react-router-dom";
import {createBrowserHistory} from 'history';
import './App.css';
import Auth from "./pages/Auth";
import CProfile from "./pages/Profile";


import Main from './pages/MainPage';




const history = createBrowserHistory();


function App() {
  return (
		<Routes>
		    <Route exact path="/" element={<Main/>} />
		    <Route exact path="/registration" element={<Auth />} />
		    <Route exact path="/profile" element={<CProfile/>} />
		</Routes>

  );
}

export default App;



