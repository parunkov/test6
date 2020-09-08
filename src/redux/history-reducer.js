const ADD_ITEM = 'history/ADD_ITEM';
const DELETE_ITEM = 'history/DELETE_ITEM';
const SET_SAVED_HISTORY = 'history/SET_SAVED_HISTORY';

const initialState = {
	history: []
}

const historyReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SAVED_HISTORY: {
			return {
				...state,
				...action.payload
			}
		}
		case DELETE_ITEM: {
			return {
				...state,
				history: state.history.filter(item => item.title !== action.title)
			}
		}
		case ADD_ITEM: {
			const newHistory = [...state.history].filter(item => item.title !== action.title).slice(-14);
			return {
				...state,
				history: [ ...newHistory,
				{
					title: action.title,
					value: action.value,
					isError: action.isError
				}]
			}
		}
		default:
		return state;
	}
}

const addHistoryItem = (title, value, isError) => ({
	type: ADD_ITEM,	
	title,
	value,
	isError
});
const deleleHistoryItem = (title) => ({
	type: DELETE_ITEM,
	title
});
const setSavedHistory = (history) => ({
	type: SET_SAVED_HISTORY,
	payload: {history}
});

export {addHistoryItem, deleleHistoryItem, setSavedHistory};
export default historyReducer;