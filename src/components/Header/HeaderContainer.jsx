import Header from './Header';
import {connect} from 'react-redux';
import {logout} from '../../redux/login-reducer';

const mapStateToProps = (state) => ({
	isLogined: state.login.isLogined,
	login: state.login.login,
	sublogin: state.login.sublogin
});

export default connect(mapStateToProps, {logout})(Header);
