import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import loginReducer from './login-reducer';
import fieldsReducer from './fields-reducer';
import historyReducer from './history-reducer';
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
	login: loginReducer,
	fields: fieldsReducer,
	history: historyReducer,
	form: formReducer
});

// const store = createStore(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;