import { useState, useEffect } from 'react';
import { database } from '../../firebase.config';
import { ref, onValue } from 'firebase/database';

const useFetchDatabase = path => {
	const [state, setState] = useState({});
	const [isFetching, setIsFetching] = useState(true);

	// Fetches Database for provided path and sets state with responding data.
	useEffect(() => {
		const fetchData = () => {
			setIsFetching(true);
			const fetchRef = ref(database, path);

			onValue(fetchRef, snapshot => {
				const data = snapshot.val();
				setState(data);
				if (data !== null) {
					setIsFetching(false);
				}
			});
		};
		fetchData();
	}, [path]);

	return [state, isFetching];
};

export default useFetchDatabase;
