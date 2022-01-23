import database from '../firebase.config';
import { ref, onValue } from 'firebase/database';

const fetchDatabase = (path) => {
    const fetchRef = ref(database, path);
    let dataFetch

	onValue(fetchRef, snapshot => {
		const data = snapshot.val();
        dataFetch = data
    });
    return dataFetch
};

export default fetchDatabase;
