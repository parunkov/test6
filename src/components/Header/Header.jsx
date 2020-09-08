import React from 'react';
import './Header.scss';
import Logo from '../common/Logo/Logo';
import Button from '../common/Button/Button';

const Header = ({login, sublogin, logout}) => {
	const onBtnClick = () => {
		localStorage.setItem('loginData', JSON.stringify({isLogined: false, login: null, sublogin: null, password: null}));
		logout();
	}
	return (
		<div className="header">
			<span className="header__logo">
				<Logo />
			</span>	
			<h1 className="header__title">API-консолька</h1>
			<span className="header__user-block">
				<span className="header__user">
					<span className="header__login">{login}</span>
					{sublogin && <span className="header__sublogin">
						<span className="header__login-separator"> : </span>
						{sublogin}
					</span>}
				</span>
				<span className="header__button"><Button type="button" onClick={onBtnClick} text="Выйти" modifiers={['themeLight', 'iconExit']} /></span>
			</span>
		</div>
	)
}

export default Header;