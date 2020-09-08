import 'isomorphic-fetch';
import Sendsay from 'sendsay-api';
import {addHistoryItem} from './history-reducer';
import {removeWaiting} from './login-reducer';

const RESPONSE = 'fields/RESPONSE';
const ERROR = 'fields/ERROR';
const DELETE_ERROR = 'fields/DELETE_ERROR';
const SET_VALUE = 'fields/SET_VALUE';

const initialState = {
	request: null,
	response: null,
	error: false,
	requestFieldValue: ''
}

const fieldsReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESPONSE:
		case ERROR:
		case DELETE_ERROR:
		case SET_VALUE: {
			return {
				...state,
				...action.payload
			}
		}
		default:
		return state;
	}
}

const setResponse = (response) => ({
	type: RESPONSE,
	payload: {response}
});
const setError = () => ({
	type: ERROR,
	payload: {error: true}
});
const deleteError = () => ({
	type: DELETE_ERROR,
	payload: {error: false}
});
const setRequestFieldValue = (requestFieldValue) => ({
	type: SET_VALUE,
	payload: {requestFieldValue}
});

const sendRequest = (login, sublogin, password, request, requestFieldValue) => (dispatch) => {
	const sendsay = new Sendsay({
		auth: {login, sublogin, password}
	});

	sendsay.request(request).then(function(res) {
		dispatch(setResponse(res));
		dispatch(deleteError());
		dispatch(addHistoryItem(request.action, requestFieldValue, false));
		dispatch(removeWaiting());
	}).catch(err => {
		dispatch(setResponse(err));
		dispatch(setError());
		dispatch(addHistoryItem(request.action, requestFieldValue, true));
		dispatch(removeWaiting());
	});
}

export {setRequestFieldValue, sendRequest};
export default fieldsReducer;