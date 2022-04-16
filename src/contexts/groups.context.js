import React, { createContext, useContext } from 'react';

import useGroupReducer from '../hooks/useGroupReducer';
import { groupReducer } from '../reducers';
import { useUser } from './user.context';

import Loading from '../components/Loading';

const GroupsContext = createContext();
const GroupsDispatch = createContext();

function useGroups() {
	const context = useContext(GroupsContext);
	if (context === undefined) {
		throw new Error('useGroups must be used within a GroupsProvider');
	}
	return context;
}

function useGroupsDispatch() {
	const dispatch = useContext(GroupsDispatch);
	if (dispatch === undefined) {
		throw new Error('useGroupsDispatch must be used within a GroupsProvider');
	}
	return dispatch;
}

function GroupsProvider({ children }) {
	const { groups } = useUser();
	const [state, dispatch, isFetching] = useGroupReducer(groupReducer, groups, []);
	return (
		<GroupsContext.Provider value={state}>
			<GroupsDispatch.Provider value={dispatch}>
				{isFetching ? <Loading /> : children}
			</GroupsDispatch.Provider>
		</GroupsContext.Provider>
	);
}

export { GroupsProvider, useGroups, useGroupsDispatch };
