
//const SET_USER_DATA = 'SET_USER_DATA';

const initialstate = {
	id: null,
	login: null,
    message: null,
    statusCode: null
};

function authReducer(state = initialstate, action) {
    console.log(action);

    if(!action){
        if(localStorage.authCode !== undefined){
            console.log('login')
            action = {};
            action.type = "LOGIN";
            action.data = {};
            action.data.id = localStorage.authCode;
            action.data.login = localStorage.authLogin;     
        }else return state;
    }

    if(action.type === 'LOGOUT'){
        localStorage.setItem('authCode', undefined);
        localStorage.setItem('authLogin', undefined);
    }



    console.log(action);

    switch(action.type){
    	case "LOGIN":
    		return {
                ...state,
                ...action.data
                /*id: action['data']['id'],
                login: action['data']['login']*/
            }
        case "ERROR":
            return{
                ...state,
                ...action.data
                /*message,
                statusCode*/
            }
        case "LOGOUT":
            return {
                id: null,
                login: null,
                message: null,
                statusCode: null
            };
    	default: 
    		return state;
    }
}

export default authReducer;
