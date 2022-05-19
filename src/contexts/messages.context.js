import React, { createContext, useContext, useEffect, useState } from 'react';
import useMessageReducer from '../hooks/useMessageReducer';
import { useLayout } from './layout.context';
import messageReducer from '../reducers/message.reducer';
import fetchDatabase from '../services/api/fetchDatabase';

import Loading from '../components/Loading';

const MessagesContext = createContext();
const MessagesDispatch = createContext();

function useMessages() {
	const context = useContext(MessagesContext);
	if (context === undefined) {
		throw new Error('useMessages must be used within a MessagesProvider');
	}
	return context;
}

function useMessagesDispatch() {
	const dispatch = useContext(MessagesDispatch);
	if (dispatch === undefined) {
		throw new Error('useMessagesDispatch must be used within a MessagesProvider');
	}
	return dispatch;
}

function MessagesProvider({ children }) {
	const { chatBox } = useLayout();
	const [messages, dispatch] = useMessageReducer(messageReducer, {});
	const [isFetching, setIsFetching] = useState(false);
	useEffect(() => {
		let isActive = true;
		if (chatBox.id && isActive) {
			setIsFetching(true);
			fetchDatabase(`/messages/${chatBox.id}`)
				.then(data => {
					if (!data) {
						data = {};
					}
					dispatch({ type: 'SET_STATE', payload: data });
				})
				.catch(error => console.log(error));

			setIsFetching(false);
		}
		return () => {
			isActive = false;
		};
	}, [chatBox.id, dispatch]);

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
