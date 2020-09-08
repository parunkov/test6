import Login from './Login';
import {connect} from 'react-redux';
import {checkLogin, setWaiting} from '../../redux/login-reducer';

const mapStateToProps = (state) => {
	return {
		isLogined: state.login.isLogined,
		error: state.login.error,
		isWaiting: state.login.isWaiting
	}
}

export default connect(mapStateToProps, {checkLogin, setWaiting})(Login);