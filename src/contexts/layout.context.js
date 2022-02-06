import { createContext, useContext } from 'react';
import layoutReducer from '../reducers/layout.reducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const LayoutContext = createContext();
const LayoutDispatch = createContext();

function useLayout() {
	const context = useContext(LayoutContext);
	if (context === undefined) {
		throw new Error('useLayout must be used within a LayoutProvider');
	}
	return context;
}
function useLayoutDispatch() {
	const dispatch = useContext(LayoutDispatch);
	if (dispatch === undefined) {
		throw new Error('useLayoutDispatch must be used within a LayoutProvider');
	}
	return dispatch;
}

const defaultLayout = {
	dataListContent: 'inbox',
	chatBox: { id: '', target: '' },
};

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
