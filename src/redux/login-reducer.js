import 'isomorphic-fetch';
import Sendsay from 'sendsay-api';

const LOGINED = 'login/LOGINED';
const LOGOUT = 'login/LOGOUT';
const ERROR = 'login/ERROR';
const SET_WAITING = 'login/SET_WAITING';
const REMOVE_WAITING = 'login/REMOVE_WAITING';

const initialState = {
	isLogined: false,
	login: null,
	sublogin: null,
	password: null,
	error: null,
	isWaiting: false
}

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGINED:
		case ERROR:
		case LOGOUT:
		case SET_WAITING:
		case REMOVE_WAITING: {
			return {
				...state,
				...action.payload
			}
		}
		default:
		return state;
	}
}

const setLogin = (login, sublogin, password) => ({
	type: LOGINED,
	payload: {isLogined: true, login, sublogin, password, error: null}
});
const logout = () =>({
	type: LOGOUT,
	payload: {isLogined: false, login: null, sublogin: null, password: null, error: null}
});
const setError = (error) => ({
	type: ERROR,
	payload: {error}
});
const setWaiting = () => ({
	type: SET_WAITING,
	payload: {isWaiting: true}
});
const removeWaiting = () => ({
	type: REMOVE_WAITING,
	payload: {isWaiting: false}
});

const checkLogin = (login, sublogin, password) => (dispatch) => {
	var sendsay = new Sendsay({
		auth: {login, sublogin, password}
	});

	sendsay.request({ action: 'sys.settings.get', list: ['about.id']}).then(function(res) {
		localStorage.setItem('loginData', JSON.stringify({isLogined: true, login, sublogin, password}));
		dispatch(setLogin(login, sublogin, password));
		dispatch(removeWaiting());
	}).catch(err => {
		const errorText = `{id: "${err.id}", explain: "${err.explain}"}`;
		dispatch(setError(errorText));
		dispatch(removeWaiting());
	});
}

export {setLogin, logout, setWaiting, removeWaiting, checkLogin};
export default loginReducer;