import { auth } from "../firebase.config";

const reducer = (state, action) => {
    switch (action.type) {
			case 'AUTH_GOOGLE':
				break;
			case 'AUTH_GITHUB':
				break;
			case 'AUTH_EMAIL':
				break;
			case 'AUTH_ANONYM':
				break;

			default:
				return state;
		}
}