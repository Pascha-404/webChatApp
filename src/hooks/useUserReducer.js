import { useEffect, useReducer, useState } from 'react';
import fetchDatabase from '../services/api/fetchDatabase';

const useUserReducer = (reducer, userId, initialValue) => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	const [isFetching, setIsFetching] = useState(true);

	/* 
	Fetches the currently authenticated userData from the Database.
	userId is provided through authContext.
	Sets fetched data as state.
	*/
	useEffect(() => {
		setIsFetching(true);
		async function getUserData() {
            const fetchedUser = await fetchDatabase(`/users/${userId}`);
            dispatch({ type: 'SET_STATE', state: fetchedUser })
            setIsFetching(false)
        }
        getUserData()
	}, [userId]);

	return [state, dispatch, isFetching];
};

export default useUserReducer;
