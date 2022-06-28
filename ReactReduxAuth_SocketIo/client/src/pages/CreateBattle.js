import React, {useEffect, useRef, useState} from "react";
import { Navigate } from "react-router-dom";
import { Link} from "react-router-dom";
import axios from 'axios';
import { io } from "socket.io-client";


const Timer = ({startSec, c}) => {
    const [sec, setSec] = useState(startSec);
    const [min,setMin] = useState(0);
    const [hour, setHour] = useState(0);
    const [count, setCount] = useState(c);
    const [message, setMessage] = useState('');

    useEffect(() => {
        	if(sec === 0) return;
            const interval = setInterval(() => {
            	setSec(sec => sec - 1)
        	}, 1000)
        	return () => { 
        		 clearInterval(interval)	
        	}
    }, [sec])
    return (
           <p>{new Date(new Date().setHours(hour, min, sec)).toLocaleString().split (", ")[1]}</p>
    )
}

let Create = () => {
	const [timers, setTimers] = useState([]);
    const [count, setCount] = useState(0);     
    let [m, setM] = useState(0);
    let [s, setS] = useState(30);
    const [id, setId] = useState(null);

    const [WebSockId, setWebSockId] = useState('')

    const [login, setLogin] = useState('');

    const [online, setOnline] = useState([]);

    useEffect(()=>{
        setLogin(localStorage.getItem('authLogin'));
    },[])


    useEffect(()=>{
        const socket = io();
        socket.once('connect', () => { 
            console.log('socket');
            console.log(socket);
            setWebSockId(socket.id);
        });

        setTimeout(()=>{
            console.log(login);
            console.log(WebSockId);
            socket.emit('throw', {logIn: login, sockId: WebSockId});
        },5000);

        socket.once('disconnect', () => {
            console.log('socket is disconnected');
        })
    }, []);

    useEffect(() => {
    	axios.get('/presentBattle')
			.then(response => {
				setId(response.data.id);
			})	
    }, []);

    useEffect(()=>{
        console.log(online);
    },[online])

    let res = (m * 60) + +s;

    useEffect(()=>{
		setTimers([Math.random(), ...timers]);
    }, []);

    return (
        <>
        	<h1>We are waiting for another player</h1>
        	<h2>The id of battle: {id}</h2>
            <p>{timers.map(i => <Timer startSec={res} c={count} key={i} />)}</p>
            <Link to="/profile" className="link">Back</Link>
            <p>{login} - {WebSockId}</p>
        </>
    )
}

export default Create;