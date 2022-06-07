import React, {useEffect, useRef, useState}  from 'react';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const Log = () => {
	let [name, setName] = useState('');
	let [pass, setPass] = useState('');
	const [sec, setSec] = useState(false);
	let history = useNavigate();

	useEffect(() => {
		if(sec === 0){
			check();
		};
		const interval = setInterval(() => {
				if(sec>0){
					setSec(sec=>sec-1);
		 			console.log(sec);
				}
		},1000)
		return () => { 
			clearInterval(interval);
	    }
	}, [sec])

	let sendMessage = async () => {
		await axios.post('/chooseUser', {
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
                <button onClick={() => { sendMessage(); setSec(2); }}  disabled={(name.length!==0 && pass.length!==0)?false:true}>Залогиниться</button>
            </div>
        </div>
	) : (
		<div style={{width: "10rem", height: "10rem", marginTop: "20%"}}>
			<h1>Loading ...</h1>
		</div>
	)
}
export default Log;