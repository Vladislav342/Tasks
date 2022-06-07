import React, {useEffect, useRef, useState}  from 'react';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';


let Auth = ({something}) =>  {
	let [name, setName] = useState('');
	let [pass, setPass] = useState('');
	const [sec, setSec] = useState(false);
	let history = useNavigate();
	let [count, setCount] = useState(0);
	let [sec2, setSec2] = useState(1);

	if(localStorage.authCode !== undefined){
		localStorage.setItem('authCode', undefined);
		localStorage.setItem('authLogin', undefined);
	}

	useEffect(() => {
		if(sec2 === 0){
			if(something.message !== null && something.message !== undefined && count === 0){
				alert(something.message);
				setCount(1);
			}
			return;
		};
		const interval = setInterval(() => {
			setSec2(sec=>sec-1);
		 	//console.log(sec2);
		},1000)
		return () => { 
				clearInterval(interval);
	    }
	}, [sec2]);

	useEffect(() => {
		if(sec === 0){
			check();
		};
		const interval = setInterval(() => {
				if(sec>0){
					setSec(sec=>sec-1);
		 			//console.log(sec);
				}
		},2000)
		return () => { 
				clearInterval(interval);
	    }
	}, [sec]);

	let sendMessage = async () => {
		await axios.post('/all/users', {
			login: name,
			password: pass
		})
	}


	const check = () => {
		return(
			history("/profile")
		);
	}

	return sec===false ? (
		<div className="center">
            <div className="form">
                <input value={name} style={{backgroundColor: name.length>0 ? 'green' : 'red'}}  onChange={e => setName(e.target.value)} type="text" placeholder="login"/>
                <input value={pass} style={{backgroundColor: pass.length>0 ? 'green' : 'red'}}  onChange={e => setPass(e.target.value)} placeholder='password'/>
                <button onClick={()=>alert("Выберите другой логин")}>Click</button>
                <button onClick={() => {  sendMessage(); setSec(1); }}  disabled={(name.length!==0 && pass.length!==0)?false:true}>Зарегистрироваться</button>
                <button><a href="/login">Login</a></button>
            </div>
        </div>
	) : (
		<div style={{width: "10rem", height: "10rem", marginTop: "20%"}}>
			<h1>Loading ...</h1>
		</div>
	)
};

//export default Auth;

const CAuth = connect((state) => ({something: state?.auth}))(Auth);
export default  CAuth;

