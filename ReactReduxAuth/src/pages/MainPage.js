import React, {useEffect, useRef, useState}  from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../Main.css';


const Main = () => {
	let setLocal = () => {
		localStorage.setItem('authCode', undefined);
		localStorage.setItem('authLogin', undefined);
	}

	return (
		<div className='backGround'>
			<div className="loginForm">	
				<Link to="/login"><button onClick={setLocal}>Log in</button></Link>
				<span>/</span>
				<Link to="/registration"><button onClick={setLocal}>Registration</button></Link>
				<p>Please registr or log in </p>
			</div>
			<div>
				
			</div>
		</div>
	)
}

export default Main;