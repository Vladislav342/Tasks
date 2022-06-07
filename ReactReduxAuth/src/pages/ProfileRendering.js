import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logOut } from '../actions/actionLogout';
import { connect } from "react-redux";



let ProfileRendering = (props, onLogout) => {
	console.log(props);

	return (
		<div>
			<h1>Your nick:<span>{props?.login ?  props.login : "ERROR"}</span></h1>
			<Link to="/registration"><button onClick={() => props.onLogout()}>Log out</button></Link>
		</div>
	);	
}

const CProfileRendering = connect(null, {onLogout: logOut})(ProfileRendering);

export default CProfileRendering;