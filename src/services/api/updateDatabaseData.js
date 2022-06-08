import { database } from '../../firebase.config';
import { ref, update } from 'firebase/database';

// updateArray example: [{path: string, value: any}, {path: string, value: any}]
function updateDatabaseData(updateArray) {
	// Loops through every object of given updateArray,
	// adds it to updates object and sends it to database
	const updates = {};
	for (let update of updateArray) {
		updates[update.path] = update.value;
	}
	update(ref(database), updates);
}

export default updateDatabaseData;
