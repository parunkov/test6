import React from 'react';
import './Button.scss';

const Button = (props) => {
	let buttonClassName = 'button';
	if (props.modifiers) {
		props.modifiers.forEach((item) => {
			buttonClassName = item === 'themeLight' ? buttonClassName + ' button_theme_light' : buttonClassName;
			buttonClassName = item === 'stateWaitig' ? buttonClassName + ' button_state_waiting' : buttonClassName;
			buttonClassName = item === 'iconFullscreen' ? buttonClassName + ' button_icon_fullscreen' : buttonClassName;
			buttonClassName = item === 'iconExitFullscreen' ? buttonClassName + ' button_icon_exit-fullscreen' : buttonClassName;
			buttonClassName = item === 'iconExit' ? buttonClassName + ' button_icon_exit' : buttonClassName;
			buttonClassName = item === 'iconDots' ? buttonClassName + ' button_icon_dots' : buttonClassName;
			buttonClassName = item === 'iconCross' ? buttonClassName + ' button_icon_cross' : buttonClassName;
			buttonClassName = item === 'iconLines' ? buttonClassName + ' button_icon_lines' : buttonClassName;
		});
	}
	return(
		<button type={props.type} className={buttonClassName} onClick={props.onClick}>{props.text}</button>
	)
}

export default Button;