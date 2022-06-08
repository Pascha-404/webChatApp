import { createContext, useContext } from 'react';
import layoutReducer from '../reducers/layout.reducer';
import useLocalStorageReducer from '../services/localStorage/useLocalStorageReducer';

const LayoutContext = createContext();
const LayoutDispatch = createContext();

// Function to simplify the use of LayoutContext in components.
function useLayout() {
	const context = useContext(LayoutContext);
	if (context === undefined) {
		throw new Error('useLayout must be used within a LayoutProvider');
	}
	return context;
}

// Function to simplify the use of LayoutDispatch in components.
function useLayoutDispatch() {
	const dispatch = useContext(LayoutDispatch);
	if (dispatch === undefined) {
		throw new Error('useLayoutDispatch must be used within a LayoutProvider');
	}
	return dispatch;
}

// default setup if no data is found in localStorage
const defaultLayout = {
	dataListContent: 'inbox',
	dataListTab: { contacts: 'existingContacts', groups: 'existingGroups' },
	groupDialog: false,
	chatBox: { id: '', target: '', targetType: '' },
};

/* 
Layout Provider to handle Context for the Layout of the application.
Data and changes are saved in localStorage under the key 'webChat_layout'
*/
function LayoutProvider({ children }) {
	const [state, dispatch] = useLocalStorageReducer(
		layoutReducer,
		defaultLayout,
		'webChat_layout'
	);

	return (
		<LayoutContext.Provider value={state}>
			<LayoutDispatch.Provider value={dispatch}>{children}</LayoutDispatch.Provider>
		</LayoutContext.Provider>
	);
}

export { useLayout, LayoutProvider, useLayoutDispatch };
