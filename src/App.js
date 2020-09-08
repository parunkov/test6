import React, {useEffect} from 'react';
import './App.scss';
import {Provider} from 'react-redux';
import Console from './components/Console/Console';
import LoginContainer from './components/Login/LoginContainer';
import store from './redux/store';
import {connect} from 'react-redux';
import {setLogin} from './redux/login-reducer';
import {setSavedHistory} from './redux/history-reducer';

const ConsoleWrapper = ({isLogined, setLogin, setSavedHistory}) => {
	useEffect(() => {
		const savedLoginData = JSON.parse(localStorage.getItem('loginData'));
		if (savedLoginData && savedLoginData.isLogined) {
			setLogin(savedLoginData.login, savedLoginData.sublogin, savedLoginData.password);
		}
		let savedHistory = JSON.parse(localStorage.getItem('history'));
		if (!savedHistory) {
			savedHistory = [];
		}
		setSavedHistory(savedHistory);
	}, [setLogin, setSavedHistory]);

	return(
		<div className="app__console">
			{!isLogined ? <LoginContainer /> : <Console />}
		</div>
	)
}

const mapStateToProps = (state) => ({
		isLogined: state.login.isLogined
});

const ConsoleWrapperContainer = connect(mapStateToProps, {setLogin, setSavedHistory})(ConsoleWrapper);

function App() {
	return (
		<Provider store={store}>
			<div className="app">
					<ConsoleWrapperContainer />
			</div>
		 </Provider>
	);
}

export default App;
