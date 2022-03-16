import { auth } from '../firebase.config';
import { signInAnonymously } from 'firebase/auth';

const reducer = (state, action) => {
	const userObject = {
		uuid: '',
		displayName: '',
		email: '',
		emailVerified: false,
		photoURL: '',
	};

	switch (action.type) {
		case 'AUTH_GOOGLE':
			break;
		case 'AUTH_GITHUB':
			break;
		case 'AUTH_EMAIL':
			break;
		case 'AUTH_ANONYM':
			signInAnonymously(auth)
				.then(data => {
					userObject.uuid = data.user.uid;
					userObject.displayName = data.user.displayName;
					userObject.email = data.user.email;
					userObject.emailVerified = data.user.emailVerified;
					userObject.photoURL = data.user.photoURL;
				})
				.catch(error => {
					console.log(error);
				});
			return { userObject };

		default:
			return state;
	}
};

export default reducer;
