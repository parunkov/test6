import React, {useState, useEffect, useRef} from 'react';
import {reduxForm, Field} from 'redux-form';
import {required, isJson} from '../../utils/validators/validators';
import {Textarea} from '../common/FormsControl/FormsControl';
import JSONPretty from 'react-json-pretty';
import {formatTextareaValue} from '../common/commonFunctions';
import Button from '../common/Button/Button';
import GitHubLink from '../common/GitHubLink/GitHubLink';
import './Fields.scss';

const FieldsForm = ({handleSubmit, error, change, response, fieldFormattedValue, requestFieldValue, setRequestFieldValue, responseError, isWaiting}) => {
	const [fieldStyle, setFieldStyle] = useState({flex: "0 0 49.6%"});

	const setField = (requestFieldValue) => {
		setRequestFieldValue(requestFieldValue);
		if (!isJson(requestFieldValue)) {
			change('request', formatTextareaValue(requestFieldValue));
		}
	}
	const onFieldChange = (evt) => {
		const requestFieldValue = evt.target.value;
		setField(requestFieldValue);
	}

	const useDrag = () => {
		const elRef = useRef();
		useEffect(() => {
			const el = elRef.current;
			if (el) {
				const onMouseDown = e => {
					e.preventDefault();
					const container = document.querySelector('.fields__container');
					const width = container.offsetWidth;
					const onMouseMove = e => {
						e.preventDefault();
						const x = e.clientX - shiftX;
						const precent = x / width * 100;
						const flexValue = `0 0 ${precent}%`;
						setFieldStyle({flex: flexValue});
					}
					const onMouseUp = e => {
						e.preventDefault();
						document.removeEventListener("mousemove", onMouseMove);
						document.removeEventListener("mouseup", onMouseUp);	
					}
					let shiftX = e.clientX - el.getBoundingClientRect().left;
					document.addEventListener("mousemove", onMouseMove);
					document.addEventListener("mouseup", onMouseUp);
				};
				el.addEventListener("mousedown", onMouseDown);
				return () => el.removeEventListener("mousedown", onMouseDown);
			}
		}, []);
		return elRef;
	}

	const resizerRef = useDrag();

	return (
		<form onSubmit={handleSubmit} className="fields__form">
			<div className="fields__container">
				<div className="fields__textarea-wrapper" style={fieldStyle}>
					<Field 
						component={Textarea} 
						name={"request"} 
						validate={[required, isJson]} 
						title="Запрос:"
						onChange={(evt) => onFieldChange(evt)}
						flex={"true"}
					/>
				</div>
				<div className="fields__resizer" ref={resizerRef}></div>
				<div className={responseError ? "fields__response-wrapper fields__response-wrapper_theme_error" : "fields__response-wrapper"}>
					<div className="fields__response-title">Ответ:</div>
					<div className="fields__response">
						<div className="fields__response-inner">{response && 
							<JSONPretty id="json-pretty" data={JSON.stringify(response, 0, 2)}></JSONPretty>}
						</div>
					</div>
				</div>
			</div>
			<div className="fields__footer">
				<div className="fields__send-button">
					<Button type="submit" text="Отправить" modifiers={isWaiting ? ['stateWaitig'] : null} />
				</div>
				<div className="fields__link">
					<GitHubLink />
				</div>
				<div className="fields__format-button">
					<Button type="button" text="Форматировать" modifiers={['themeLight', 'iconLines']} onClick={() => setField(requestFieldValue)} />
				</div>
			</div>
		</form>
		)
}

const FieldsReduxForm = reduxForm ({
	form: 'request'
})(FieldsForm);

const Fields = ({login, sublogin, password, request, response, error, sendRequest, fieldFormattedValue, requestFieldValue, setRequestFieldValue, isWaiting, setWaiting}) => {
	const onSubmit = (formData) => {
		setWaiting();
		// console.log(formData.request);
		sendRequest(login, sublogin, password, JSON.parse(formData.request), requestFieldValue);
	}

	return(
		<div className="fields">
			<FieldsReduxForm 
				onSubmit={onSubmit} 
				response={response} 
				fieldFormattedValue={fieldFormattedValue} 
				requestFieldValue={requestFieldValue} 
				setRequestFieldValue={setRequestFieldValue} 
				responseError={error}
				isWaiting={isWaiting}
			/>
		</div>
	)
}

export default Fields;