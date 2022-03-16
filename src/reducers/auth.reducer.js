import { firebaseAuth } from '../firebase.config';
import { signInAnonymously } from 'firebase/auth';

const reducer = (state, action) => {
	const userObject = {
		uuid: '',
		displayName: '',
		email: '',
		emailVerified: false,
		photoURL: '',
		isAnonymous: false,
		contacts: true,
		groupChats: true,
		userChats: true,
	};

	switch (action.type) {
		case 'AUTH_GOOGLE':
			break;
		case 'AUTH_GITHUB':
			break;
		case 'AUTH_EMAIL':
			break;
		case 'AUTH_ANONYM':
			signInAnonymously(firebaseAuth)
				.then(data => {
					if (data.user.email === null) {
						userObject.email = false;
					} else if (data.user.email !== null) {
						userObject.email = data.user.email;
					} else if (data.user.photoURL === null) {
						userObject.photoURL = false;
					} else if (data.user.photoURL !== null) {
						userObject.photoURL = data.user.photoURL;
					}
					userObject.uuid = data.user.uid;
					userObject.displayName = action.loginId;
					userObject.emailVerified = data.user.emailVerified;
					userObject.isAnonymous = data.user.isAnonymous;
				})
				.catch(error => {
					console.log(error);
				});
			return userObject;
		case 'SET_STATE':
			return { ...action.state };
		default:
			return state;
	}
};

export default reducer;
