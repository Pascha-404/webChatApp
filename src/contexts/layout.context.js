import { createContext, useContext } from 'react';
import layoutReducer from '../reducers/layout.reducer';
import useLayoutReducer from '../hooks/useLayoutReducer';

const LayoutContext = createContext();
const LayoutDispatch = createContext();

function useLayoutContext() {
	const context = useContext(LayoutContext);
	if (context === undefined) {
		throw new Error('useLayoutContext must be used within a LayoutProvider');
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
	chatBox: { id: '', target: ''},
};

function LayoutProvider({ children }) {
	const [state, dispatch] = useLayoutReducer(layoutReducer, defaultLayout);
	return (
		<LayoutContext.Provider value={state}>
			<LayoutDispatch.Provider value={dispatch}>{children}</LayoutDispatch.Provider>
		</LayoutContext.Provider>
	);
}

export { useLayoutContext, LayoutProvider, useLayoutDispatch };
