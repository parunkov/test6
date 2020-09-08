import React from 'react';
import JSONPretty from 'react-json-pretty';
import ReactDOMServer from 'react-dom/server';

const formatTextareaValue = (value) => {
	const formattedValueElement = <JSONPretty id="json-pretty" data={value}></JSONPretty>
	const formattedValue = ReactDOMServer.renderToString(formattedValueElement);
	const requestFieldValue = formattedValue.replace(/<[^<>]+>/gi,'').replace(/&nbsp;/gi, '');
	return requestFieldValue;
}

export {formatTextareaValue};