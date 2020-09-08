import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {required, emailOrString, stringWithSpace} from '../../utils/validators/validators';
import {Input} from '../common/FormsControl/FormsControl';
import './Login.scss';
import Logo from '../common/Logo/Logo';
import Button from '../common/Button/Button';
import GitHubLink from '../common/GitHubLink/GitHubLink';

const LoginForm = ({handleSubmit, error, loginError, isWaiting}) => {
	return (
		<form onSubmit={handleSubmit} className="login__form">
			<h1 className="login__title">API-консолька</h1>
			{loginError && <div className="login__error">
				<div className="login__error-title">
					<span className="login__error-smile"></span>	
					<span className="login__error-title-text">Вход не вышел</span>
				</div> 
				<div className="login__error-text">{loginError}</div>
			</div>}
			<div className="login__input">
				<Field component={Input} name={"login"} validate={[required, emailOrString]} title="Логин" />
			</div>
			<div className="login__input">
				<Field component={Input} name={"sublogin"} title="Сублогин" subtitle="Опционально" />
			</div>
			<div className="login__input">
				<Field component={Input} name={"password"} password={"true"} validate={[required, stringWithSpace]} type={"password"} title="Пароль" />
			</div>
			<div className="login__button">
				<Button type="submit" text="Войти" modifiers={isWaiting ? ['stateWaitig'] : null} />
			</div>
		</form>
		)
}

const LoginReduxForm = reduxForm ({
	form: 'login'
})(LoginForm);

const Login = ({checkLogin, error, isWaiting, setWaiting}) => {
	const onSubmit = (formData) => {
		setWaiting();
		checkLogin(formData.login, formData.sublogin, formData.password);
	}
	return (
		<div className="login">
			<div className="login__form-wrapper">
				<div className="login__logo">
					<Logo />
				</div>
				<LoginReduxForm onSubmit={onSubmit} loginError={error} isWaiting={isWaiting} />
				<div className="login__link">
					<GitHubLink />
				</div>
			</div>
		</div>
	)
		
}

export default Login;