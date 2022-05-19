import { useEffect, useReducer } from 'react';
import { fetchDatabase } from '../services/api';

const useFindGroupReducer = (reducer, knownGroups, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);

	useEffect(() => {
		async function findNewGroups() {
			const fetchedGroups = await fetchDatabase('/groups');

			const filteredGroups = Object.values(fetchedGroups).filter(fetchedGroup => {
				if (fetchedGroup.isDeleted) {
					return false;
				}
				for (let group of knownGroups) {
					if (group.uuid === undefined || group.uuid === fetchedGroup.uuid) {
						return false;
					}
				}
				return true;
			});
			dispatch({ type: 'SET_STATE', state: filteredGroups });
		}
		let isActive = true;
		if (isActive) {
			findNewGroups();
		}
		return () => {
			isActive = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.refresh, knownGroups]);

	return [state, dispatch];
};

export default useFindGroupReducer;
