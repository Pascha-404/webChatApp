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
firebaseAuth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

async function setPersistenceSession() {
	try {
		await setPersistence(firebaseAuth, browserSessionPersistence);
	} catch (error) {
		console.log(error);
	}
}

async function setPersistenceLocal() {
	try {
		await setPersistence(firebaseAuth, browserLocalPersistence);
	} catch (error) {
		console.log(error);
	}
}

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
