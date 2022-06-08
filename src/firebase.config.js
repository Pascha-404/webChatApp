import { initializeApp } from 'firebase/app';
import { child, getDatabase, ref, set, get } from 'firebase/database';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInAnonymously,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
	GithubAuthProvider,
	signInWithRedirect,
	getRedirectResult,
} from 'firebase/auth';

// Sensitive data provided through .env file.
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_PROJECT_ID + '.firebaseapp.com',
	databaseURL:
		'https://' +
		process.env.REACT_APP_FIREBASE_PROJECT_ID +
		'-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_PROJECT_ID + '.appspot.com',
	messagingSenderId: process.env.MSG_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initializes Firebase Services
const database = getDatabase(app);
const dbRef = ref(database);
const firebaseAuth = getAuth(app);
// Uses language of device for authentication process.
firebaseAuth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Sets authentication persistence to 'session'.
// If session is closed the user needs to authenticate again on next visit.
async function setPersistenceSession() {
	try {
		await setPersistence(firebaseAuth, browserSessionPersistence);
	} catch (error) {
		console.log(error);
	}
}

// Sets authentication persistence to 'local'.
// User just needs to authenticate again if he logged out before.
async function setPersistenceLocal() {
	try {
		await setPersistence(firebaseAuth, browserLocalPersistence);
	} catch (error) {
		console.log(error);
	}
}

// Registers the user anonym and creates a new user in database with provided loginId.
// Persists for one session, can't reenter that account after session was closed.
async function registerAnonym(loginId, dispatch) {
	try {
		await setPersistenceSession();
		const res = await signInAnonymously(firebaseAuth);
		const user = res.user;
		await set(ref(database, `/users/${user.uid}`), {
			uuid: user.uid,
			displayName: loginId,
			email: false,
			emailVerified: false,
			photoURL: false,
			isAnonymous: true,
			contacts: false,
			groupChats: false,
			userChats: false,
		});
	} catch (error) {
		dispatch({
			type: 'SET_STATE',
			state: { error: true, errorCode: error.code },
		});
	}
}

// Registers the user with email and password. Creates a new user in database.
// If rememberMe was clicked/choosen the login persists till user logged out.
async function registerWithEmail(loginId, password, rememberMe, dispatch) {
	try {
		if (rememberMe) {
			await setPersistenceLocal();
		} else {
			await setPersistenceSession();
		}
		const res = await createUserWithEmailAndPassword(firebaseAuth, loginId, password);
		const user = res.user;
		await set(ref(database, `/users/${user.uid}`), {
			uuid: user.uid,
			displayName: loginId,
			email: loginId,
			emailVerified: false,
			photoURL: false,
			isAnonymous: false,
			contacts: false,
			groupChats: false,
			userChats: false,
		});
	} catch (error) {
		dispatch({ type: 'SET_STATE', state: { error: true, errorCode: error.code } });
	}
}

// Login with provided credentials in already existing user account.
// If rememberMe was clicked/choosen the login persists till user logged out.
async function logInWithEmail(loginId, password, rememberMe, dispatch) {
	try {
		if (rememberMe) {
			await setPersistenceLocal();
		} else {
			await setPersistenceSession();
		}
		await signInWithEmailAndPassword(firebaseAuth, loginId, password);
	} catch (error) {
		dispatch({
			type: 'SET_STATE',
			state: { error: true, errorCode: error.code },
		});
	}
}

// Login with google account. Navigates to google authentication page.
// Sets webChat_redirect in localstorage to true => Checks if user exists in DB. (checkRedirectData function below)
// Login persists for the session.
async function logInWithGoogle(dispatch) {
	try {
		localStorage.setItem('webChat_redirect', true);
		await setPersistenceSession();
		await signInWithRedirect(firebaseAuth, googleProvider);
	} catch (error) {
		dispatch({
			type: 'SET_STATE',
			state: { error: true, errorCode: error.code },
		});
	}
}

// Login with github account. Navigates to github authentication page.
// Sets webChat_redirect in localstorage to true => Checks if user exists in DB. (checkRedirectData function below)
// Login persists for the session.
async function logInWithGithub(dispatch) {
	try {
		localStorage.setItem('webChat_redirect', true);
		await setPersistenceSession();
		await signInWithRedirect(firebaseAuth, githubProvider);
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'SET_STATE',
			state: { error: true, errorCode: error.code },
		});
	}
}

/* 
	 Checks after redirect the incoming userData. (Redirect from google or github)
	 If User exists in DB => just reset isRedirected value.
	 If user !exists in DB => create User in DB and reset isRedirected value. 
	 */
async function checkRedirectData(setStoreFunction) {
	try {
		const res = await getRedirectResult(firebaseAuth);
		if (res) {
			const user = res.user;
			const userInDb = await get(child(dbRef, `/users/${user.uid}`));
			if (userInDb.exists()) {
				// do nothing
			} else {
				await set(ref(database, `/users/${user.uid}`), {
					uuid: user.uid,
					displayName: user.displayName,
					email: user.email,
					emailVerified: user.emailVerified,
					photoURL: user.photoURL,
					isAnonymous: false,
					contacts: false,
					groupChats: false,
					userChats: false,
					groups: false,
				});
			}
		}
		setStoreFunction(false);
	} catch (error) {
		setStoreFunction(false);
	}
}

export {
	database,
	firebaseAuth,
	registerAnonym,
	registerWithEmail,
	logInWithEmail,
	logInWithGoogle,
	logInWithGithub,
	checkRedirectData,
};
