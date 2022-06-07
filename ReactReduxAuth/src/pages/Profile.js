import React from 'react';
import ProfileRendering from "./ProfileRendering";
import { Navigate } from "react-router-dom";
import { setUserData } from "../actions/actionSetUserData";
import { setError } from "../actions/actionError";
import { logOut } from '../actions/actionLogout';
import CAuth from "./Auth";
import axios from "axios";
import { connect } from "react-redux";


class Profile extends React.Component{
	async componentDidMount(){
		axios.get('auth/me', {withCredentials: true})
			.then(response => {
				if(response.data.id && response.data.login){
					if(localStorage.authCode === 'undefined'){
						console.log('here_111111111111111111111');
						console.log(response.data);
						console.log(this.props);

						let {id, login} = response.data;
						this.props.setUserData(id, login);
						this.props = response.data;
						localStorage.setItem('authCode', id);
						localStorage.setItem('authLogin', login);

						console.log(response.data);
						console.log(this.props);
					}else{
						console.log('here_22222222222222222222');
						console.log(localStorage.authCode);
						console.log(this.props);

						this.props.setUserData(localStorage.authCode, localStorage.authLogin)
					}
				}else{
					console.log('here_3333333333333333')
					console.log(response.data);

					let {message, statusCode} = response.data;
					this.props.setError(message,statusCode);

					console.log(this.props);
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
	render(){
		return this.props.login === undefined ? (
			<div>
				<Navigate to="/registration" />
			</div>
			) : (
			<div>
				<ProfileRendering {...this.props} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	login: state?.auth?.login,
	id: state?.auth?.id
}); 

const CProfile = connect(mapStateToProps, {setUserData, setError, onLogout: logOut})(Profile);
export default CProfile;