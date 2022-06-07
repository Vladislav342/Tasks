import React from "react";
import {Route, Routes} from "react-router-dom";
import {createBrowserHistory} from 'history';
import './App.css';
import Auth from "./pages/Auth";
import CProfile from "./pages/Profile";
import Search from "./pages/Search";
import GetUsers from './components/GetUsers';
import Main from './pages/MainPage';
import Log from "./pages/Log";



const history = createBrowserHistory();


function App() {
  return (
		<Routes>
		    <Route exact path="/" element={<Main/>} />
		    <Route exact path="/registration" element={<Auth />} />
		    <Route exact path="/search" element={<Search />} />
		    <Route exact path="/login" element={<Log />} />
		    <Route exact path="/profile" element={<CProfile/>} />
		</Routes>

  );
}

export default App;



