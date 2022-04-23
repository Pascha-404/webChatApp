import React, { createContext, useContext } from 'react';

import useGroupReducer from '../hooks/useGroupReducer';
import { findGroupReducer, groupReducer } from '../reducers';
import { useUser } from './user.context';

import Loading from '../components/Loading';
import useFindGroupReducer from '../hooks/useFindGroupReducer';

const GroupsContext = createContext();
const GroupsDispatch = createContext();
const FindGroupsContext = createContext();
const FindGroupsDispatch = createContext();

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
function useFindGroups() {
	const context = useContext(FindGroupsContext);
	if (context === undefined) {
		throw new Error('useFindGroups must be used within a GroupsProvider');
	}
	return context;
}

function useFindGroupsDispatch() {
	const dispatch = useContext(FindGroupsDispatch);
	if (dispatch === undefined) {
		throw new Error('useFindGroupsDispatch must be used within a GroupsProvider');
	}
	return dispatch;
}

function GroupsProvider({ children }) {
	const { groups } = useUser();
	const [groupsData, dispatch, isFetching] = useGroupReducer(groupReducer, groups, []);
	const [foundGroupsData, foundGroupsDispatch] = useFindGroupReducer(
		findGroupReducer,
		groupsData,
		{refresh: false}
	);
	return (
		<GroupsContext.Provider value={groupsData}>
			<GroupsDispatch.Provider value={dispatch}>
				<FindGroupsContext.Provider value={foundGroupsData}>
					<FindGroupsDispatch.Provider value={foundGroupsDispatch}>
						{isFetching ? <Loading /> : children}
					</FindGroupsDispatch.Provider>
				</FindGroupsContext.Provider>
			</GroupsDispatch.Provider>
		</GroupsContext.Provider>
	);
}

export {
	GroupsProvider,
	useGroups,
	useGroupsDispatch,
	useFindGroups,
	useFindGroupsDispatch,
};
