import React from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import FieldsContainer from '../Fields/FieldsContainer';
import HistoryContainer from '../History/HistoryContainer';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import './Console.scss';
import Button from '../common/Button/Button';

const Console = () => {
	const handle = useFullScreenHandle();
	return (
		<div className="console">
			<div className="console__button">
				{!handle.active && <Button type="button" onClick={handle.enter} text="Полноэкранный режим" modifiers={['themeLight', 'iconFullscreen']} />}
			</div>
			<FullScreen handle={handle}>
				<div className="console__fields">
					<FieldsContainer />
				</div>
				<div className="console__header">
					<HeaderContainer />
				</div>
				{handle.active && <div className="console__button">
					<Button type="button" onClick={handle.exit} text="Выход из полноэкранного режима" modifiers={['themeLight', 'iconExitFullscreen']} />
				</div>}
				<div className="console__history">
					<HistoryContainer />
				</div>
			</FullScreen>
		</div>
	)
}

export default Console;