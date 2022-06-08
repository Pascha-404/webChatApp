import React, { createContext, useContext, useState } from 'react';
import useMessageReducer from '../hooks/useMessageReducer';
import { useLayout } from './layout.context';
import messageReducer from '../reducers/message.reducer';

import Loading from '../components/Loading';

const MessagesContext = createContext();
const MessagesDispatch = createContext();

// Function to simplify the use of MessagesContext in components.
function useMessages() {
	const context = useContext(MessagesContext);
	if (context === undefined) {
		throw new Error('useMessages must be used within a MessagesProvider');
	}
	return context;
}

// Function to simplify the use of MessagesDispatch in components.
function useMessagesDispatch() {
	const dispatch = useContext(MessagesDispatch);
	if (dispatch === undefined) {
		throw new Error('useMessagesDispatch must be used within a MessagesProvider');
	}
	return dispatch;
}

/* 
Messages Provider to handle Context for Messages.
Fetches messages for the currently active/viewed chat in the chatBox(data provided through layoutContext).
*/
function MessagesProvider({ children }) {
	const { chatBox } = useLayout();
	const [isFetching, setIsFetching] = useState(false);
	const [messages, dispatch] = useMessageReducer(
		messageReducer,
		chatBox,
		setIsFetching,
		{}
	);

	if (chatBox.id) {
		return (
			<MessagesContext.Provider value={messages}>
				<MessagesDispatch.Provider value={dispatch}>
					{!isFetching && children}
					{isFetching && <Loading />}
				</MessagesDispatch.Provider>
			</MessagesContext.Provider>
		);
	}
	return null;
}

export { MessagesProvider, useMessages, useMessagesDispatch };
