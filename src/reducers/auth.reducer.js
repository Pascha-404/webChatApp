import { firebaseAuth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { logInWithEmail } from '../firebase.config';

const reducer = (state, action) => {
	switch (action.type) {
		case 'AUTH_GOOGLE':
			return { ...state, authGoogle: true };
		case 'AUTH_GITHUB':
			break;
		case 'AUTH_EMAIL':
			return {
				...state,
				loginId: action.loginId,
				password: action.password,
				regEmail: true,
			};
		case 'AUTH_ANONYM':
			return { ...state, loginId: action.loginId, regAnonym: true };
		case 'SIGNIN':
			logInWithEmail(action.loginId, action.password);
			return state;
		case 'SIGNOUT':
			signOut(firebaseAuth).catch(error => {
				console.error(error);
			});
			return { ...state, uuid: '' };
		case 'SET_STATE':
			return { ...action.state };
		case 'SET_STATE_KEY':
			return { ...state, [action.key]: action.state };
		default:
			return state;
	}
};

export default reducer;
