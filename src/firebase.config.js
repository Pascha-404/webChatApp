import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

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
const firebaseAuth = getAuth(app);

async function registerAnonym(loginId) {
	try {
		const res = await signInAnonymously(firebaseAuth)
		const user = res.user
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
	})
	}
	catch (error){
		console.log(error)
	}
}

export { database, firebaseAuth, registerAnonym };
