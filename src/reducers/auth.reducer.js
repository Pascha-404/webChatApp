import { firebaseAuth } from '../firebase.config';
import { signOut } from 'firebase/auth';

const reducer = (state, action) => {

	switch (action.type) {
		case 'AUTH_GOOGLE':
			break;
		case 'AUTH_GITHUB':
			break;
		case 'AUTH_EMAIL':
			break;
		case 'AUTH_ANONYM':
			return {...state, loginId: action.loginId, regAnonym: true};
		case 'SIGNOUT':
			signOut(firebaseAuth).catch(error => {
				console.error(error);
			});
			return {...state, uuid: ''};
		case 'SET_STATE':
			return { ...action.state };
		case 'SET_STATE_KEY':
			return { ...state, [action.key]: action.state };
		default:
			return state;
	}
};

export default reducer;
