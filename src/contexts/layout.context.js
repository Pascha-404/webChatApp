import { createContext } from 'react';
import layoutReducer from '../reducers/layout.reducer';
import useLayoutReducer from '../hooks/useLayoutReducer';

const LayoutContext = createContext();
const LayoutDispatch = createContext();

const defaultLayout = {
    dataListContent: 'inbox',
    chatBoxId: ''
};

function LayoutProvider({ children }) {
    const [state, dispatch] = useLayoutReducer(layoutReducer, defaultLayout);
	return (
		<LayoutContext.Provider value={state}>
			<LayoutDispatch.Provider value={dispatch}>{children}</LayoutDispatch.Provider>
		</LayoutContext.Provider>
	);
}

export { LayoutContext, LayoutProvider, LayoutDispatch };
