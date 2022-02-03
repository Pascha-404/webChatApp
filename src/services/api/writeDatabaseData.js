import database from '../../firebase.config';
import { ref, set } from 'firebase/database';

function writeDatabaseData(path, paramsObject) {
	set(ref(database, path), paramsObject);
}

export default writeMessageData;
