import { database } from '../../firebase.config';
import { ref, child, get } from 'firebase/database';

// Fetches data from provided path and returns snapshot of that data.
const fetchDatabase = path => {
	const dbRef = ref(database);

	return get(child(dbRef, path))
		.then(snap => {
			if (snap.exists()) {
				return snap.val();
			} else {
				console.log('No data available');
			}
		})
		.catch(error => {
			console.log(error);
		});
};

export default fetchDatabase;
