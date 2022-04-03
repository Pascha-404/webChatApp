import { firebaseAuth } from '../firebase.config';
import { signOut } from 'firebase/auth';

const reducer = (state, action) => {
	switch (action.type) {
		case 'AUTH_GOOGLE':
			return { ...state, authGoogle: true };
		case 'AUTH_GITHUB':
			return { ...state, authGithub: true };
		case 'AUTH_EMAIL':
			return {
				...state,
				loginId: action.loginId,
				password: action.password,
				regEmail: true,
				rememberMe: action.rememberMe,
			};
		case 'AUTH_ANONYM':
			return { ...state, loginId: action.loginId, regAnonym: true };
		case 'SIGNIN_EMAIL':
			return {
				...state,
				loginId: action.loginId,
				password: action.password,
				logInEmail: true,
				rememberMe: action.rememberMe,
			};
		case 'SIGNOUT':
			signOut(firebaseAuth).catch(error => {
				console.error(error);
			});
			return { ...state, uuid: '' };
		case 'SET_STATE':
			return { ...state, ...action.state };
		default:
			return state;
	}
};

export default reducer;
