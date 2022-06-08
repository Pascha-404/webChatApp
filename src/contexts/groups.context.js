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

// Function to simplify the use of GroupsContext in components.
function useGroups() {
	const context = useContext(GroupsContext);
	if (context === undefined) {
		throw new Error('useGroups must be used within a GroupsProvider');
	}
	return context;
}

// Function to simplify the use of GroupsDispatch in components.
function useGroupsDispatch() {
	const dispatch = useContext(GroupsDispatch);
	if (dispatch === undefined) {
		throw new Error('useGroupsDispatch must be used within a GroupsProvider');
	}
	return dispatch;
}

// Function to simplify the use of FindGroupsContext in components.
function useFindGroups() {
	const context = useContext(FindGroupsContext);
	if (context === undefined) {
		throw new Error('useFindGroups must be used within a GroupsProvider');
	}
	return context;
}

// Function to simplify the use of FindGroupsDispatch in components.
function useFindGroupsDispatch() {
	const dispatch = useContext(FindGroupsDispatch);
	if (dispatch === undefined) {
		throw new Error('useFindGroupsDispatch must be used within a GroupsProvider');
	}
	return dispatch;
}

/* 
Groups Provider to handle Context for Groups and finding Groups.
Fetches groupsData based on the provided information through userContext.
foundGroupsData fetches a list of all Groups, excluding already known Groups.
*/
function GroupsProvider({ children }) {
	const { groups } = useUser();
	const [groupsData, dispatch, isFetching] = useGroupReducer(groupReducer, groups, []);
	const [foundGroupsData, foundGroupsDispatch] = useFindGroupReducer(
		findGroupReducer,
		groupsData,
		{ refresh: false, foundGroups: [] }
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
