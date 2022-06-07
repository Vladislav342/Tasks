import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";





let ProfileRendering = (props) => {
	console.log(props);

	return (
		<div>
			<h1>Your nick:<span>{props?.login ?  props.login : "ERROR"}</span></h1>
			<Link to="/registration"><button onClick={() => props.onLogout()}>Log out</button></Link>
			<button onClick={()=>console.log(props)}>Click here</button>
		</div>
	);	
}



export default ProfileRendering;