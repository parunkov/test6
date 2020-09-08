import React, {useState, useEffect, useRef} from 'react';
import './History.scss';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {formatTextareaValue} from '../common/commonFunctions';
import Button from '../common/Button/Button';
import {CSSTransition} from 'react-transition-group';

const HistoryItem = ({item, deleleHistoryItem, change, sendRequest, login, sublogin, password, openToTop, setRequestFieldValue}) => {
	const [dropdownOpened, setDropdownOpened] = useState(false);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const el = document.querySelector('.history__dropdown');
		if (el) {
			const onClick = (e) => {
				if (!el.contains(e.target)) {
					setDropdownOpened(false);
				}
			}
			window.addEventListener('click', onClick);
			return () => window.removeEventListener('click', onClick);
		}
	});

	return(
		<span className="history__item" onMouseDown={() => {
			change('request', 'request', formatTextareaValue(item.value));
			setRequestFieldValue(item.value);
		}}>
			<span className={item.isError ? "history__status history__status_theme_error" : "history__status"}></span>
			<span className="history__title">{item.title}
				<CSSTransition
				in={copied}
				timeout={1000}
				classNames="history__item-copied"
				unmountOnExit
				onEnter={() => setCopied(true)}
				onExited={() => setCopied(false)}>
					<span className="history__item-copied">Скопировано</span>
				</CSSTransition>
			</span>
			<span className="history__item-button">
				<Button type="button" onClick={() => setDropdownOpened(!dropdownOpened)} text="..." modifiers={['iconDots']} />
			</span>
			{dropdownOpened && <div className={
				openToTop ? "history__dropdown history__dropdown_position_top" : "history__dropdown"
			}>
				<div className="history__dropdown-item" onClick={() => {
					console.log(item.value);
					sendRequest(login, sublogin, password, JSON.parse(item.value), item.value);
					setDropdownOpened(false);
				}}>Выполнить</div>
				<CopyToClipboard text={item.value} onCopy={() => {
					setCopied(true);
					setDropdownOpened(false);
					setTimeout(setCopied, 500, false);
				}}>
					<div className="history__dropdown-item">Скопировать</div>
				</CopyToClipboard> 
				<div className="history__dropdown-item-border"></div>         
				<div className="history__dropdown-item history__dropdown-item_theme_destructive" onClick={() => {
					deleleHistoryItem(item.title);
					setDropdownOpened(false);
				}}>Удалить</div>
				</div>}
		</span>
	)
}

const History = ({history, change, deleleHistoryItem, sendRequest, login, sublogin, password, setSavedHistory, setRequestFieldValue}) => {

	const [openToTop, setOpenToTop] = useState(false);

	useEffect(() => {
		localStorage.setItem('history', JSON.stringify(history));
	}, [history]);

	const useResize = () => {
		const elRef = useRef();
		useEffect(() => {
			const el = elRef.current;
			if (el) {
				const onResize = () => {
					const distanceToBottom = document.documentElement.clientHeight - el.getBoundingClientRect().y;
					if (distanceToBottom < 170) {
						setOpenToTop(true);
					} else {
						setOpenToTop(false);
					}
				}
				onResize();
				window.addEventListener('resize', onResize);
				window.addEventListener('scroll', onResize);
				return () => {
					window.removeEventListener('resize', onResize);
					window.removeEventListener('scroll', onResize);
				}
			}
		},[]);
		return elRef;
	}

	const itemsRef = useResize();

	const useHorizontalScroll = () => {
		const elRef = useRef();
		useEffect(() => {
			const el = elRef.current;
			if (el) {
				const onWheel = e => {
					e.preventDefault();
					el.scrollTo({
						left: el.scrollLeft + e.deltaY,
						behavior: "smooth"
					});
				};
				el.addEventListener("wheel", onWheel);
				return () => el.removeEventListener("wheel", onWheel);
			}
		}, []);
		return elRef;
	}

	const scrollRef = useHorizontalScroll();

	return(
		<div className="history">
			<div className="history__container" ref={scrollRef}>
				<div className="history__items" ref={itemsRef}>
					{[...history].reverse().map((item, i) => <HistoryItem 
						key={i} 
						className="" 
						item={item} 
						deleleHistoryItem={deleleHistoryItem}
						change={change}
						sendRequest={sendRequest}
						login={login}
						sublogin={sublogin}
						password={password}
						openToTop={openToTop}
						setRequestFieldValue={setRequestFieldValue} />)}
				</div>
			</div>
			<span className="history__button">
				<Button type="button" onClick={() => setSavedHistory([])} text="Очистить историю" modifiers={['button_theme_light', 'iconCross']} />
				<span className="history__shadow"></span>
			</span>
		</div>
	)
}

export default History;