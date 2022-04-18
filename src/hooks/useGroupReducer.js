import { useReducer, useState, useEffect } from 'react';
import { fetchDatabase } from '../services/api';

const useGroupReducer = (reducer, userGroups, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		async function fetchGroupsData() {
			try {
				setIsFetching(true);
				const activeGroups = Object.keys(userGroups).filter(
					group => userGroups[group] === true
				);
				const fetchedData = await Promise.all(
					activeGroups.map(async group => {
						const fetchedGroup = await fetchDatabase(`/groups/${group}`);
						const { displayName, uuid, photoURL, members, chatId } = fetchedGroup;
						const groupObject = {
							displayName,
							uuid,
							photoURL,
							members,
							chatId,
							isMember: true,
						};
						return groupObject;
					})
				);
				dispatch({ type: 'SET_STATE', state: fetchedData });
				setIsFetching(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchGroupsData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [state, dispatch, isFetching];
};

export default useGroupReducer;
