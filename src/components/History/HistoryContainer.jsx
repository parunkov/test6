import History from './History';
import {connect} from 'react-redux';
import {deleleHistoryItem, setSavedHistory} from '../../redux/history-reducer';
import {change} from 'redux-form';
import {sendRequest, setRequestFieldValue} from '../../redux/fields-reducer';

const mapStateToProps = (state) => {
	return {
		login: state.login.login,
		sublogin: state.login.sublogin,
		password: state.login.password,
		history: state.history.history
	}
}

export default connect(mapStateToProps, {deleleHistoryItem, setSavedHistory, change, sendRequest, setRequestFieldValue})(History);